import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { CertificationCard } from './components/CertificationCard'
import { CompletionModal } from './components/CompletionModal'
import { FindContractsSection } from './components/FindContractsSection'
import { Glossary } from './components/Glossary'
import { HeroSection } from './components/HeroSection'
import { IntakeForm } from './components/IntakeForm'
import { ProgressBar } from './components/ProgressBar'
import { StepCard } from './components/StepCard'
import { findContractTools } from './data/findContracts'
import {
  getAllTrackableIds,
  getCertificationTracks,
  getDesignationLabel,
  getIndustryLabel,
  getPersonalizedSteps,
  getStructureLabel,
  isRecommendedCert,
} from './data/personalization'
import type { OnboardingStep } from './data/types'
import { useProgressTracker } from './hooks/useProgressTracker'
import { useScrollGuideReveal } from './hooks/useScrollGuideReveal'
import { useRipple } from './hooks/useRipple'
import { useUserProfile } from './hooks/useUserProfile'
import { IconCheck, IconSearch, IconStar } from './components/GuideIcons'
import { smoothScrollToElement } from './utils/smoothScroll'
import './App.css'

type GuideItem =
  | { kind: 'step'; step: OnboardingStep; stepIndex: number }
  | { kind: 'section-header'; id: string; title: string; subtitle: string }
  | { kind: 'cert'; certId: string; certIndex: number }
  | { kind: 'find-contracts' }

function App() {
  const { profile, intakeComplete, saveProfile, resetProfile } = useUserProfile()
  const [glossaryOpen, setGlossaryOpen] = useState(false)
  const [completionDismissed, setCompletionDismissed] = useState(false)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const ripple = useRipple()

  const steps = useMemo(
    () => (profile ? getPersonalizedSteps(profile) : []),
    [profile],
  )
  const certs = useMemo(
    () => (profile ? getCertificationTracks(profile) : []),
    [profile],
  )
  const trackableIds = useMemo(
    () => (profile ? getAllTrackableIds(profile) : []),
    [profile],
  )

  const guideItems = useMemo((): GuideItem[] => {
    if (!profile) return []

    const coreBeforeCerts = steps.filter((s) =>
      ['size-standards', 'sam-registration', 'uei', 'naics'].includes(s.id),
    )
    const coreAfterCerts = steps.filter((s) =>
      ['far-basics', 'financial-systems'].includes(s.id),
    )
    const capability = steps.find((s) => s.id === 'capability-statement')!
    const submitBid = steps.find((s) => s.id === 'submit-bid')!

    const items: GuideItem[] = []
    let stepNum = 0

    coreBeforeCerts.forEach((step) => {
      items.push({ kind: 'step', step, stepIndex: stepNum++ })
    })

    items.push({
      kind: 'section-header',
      id: 'cert-header',
      title: 'Certification Tracks',
      subtitle: 'Based on your profile, these programs may unlock set-aside contracts and sole-source opportunities.',
    })
    certs.forEach((_, i) => {
      items.push({ kind: 'cert', certId: certs[i].id, certIndex: i })
    })

    coreAfterCerts.forEach((step) => {
      items.push({ kind: 'step', step, stepIndex: stepNum++ })
    })

    items.push({ kind: 'step', step: capability, stepIndex: stepNum++ })
    items.push({ kind: 'find-contracts' })
    items.push({ kind: 'step', step: submitBid, stepIndex: stepNum++ })

    return items
  }, [steps, certs, profile])

  const maxNavIndex = Math.max(0, guideItems.length - 1)

  const navigableIndices = useMemo(
    () =>
      guideItems
        .map((item, i) => (item.kind !== 'section-header' ? i : null))
        .filter((i): i is number => i !== null),
    [guideItems],
  )

  const {
    completed,
    toggle,
    reset,
    completedCount,
    progress,
    allComplete,
    activeIndex,
    setActiveIndex,
  } = useProgressTracker(trackableIds, maxNavIndex)

  const navItems = useMemo(() => {
    return guideItems
      .map((item, i) => {
        if (item.kind === 'section-header') return null
        if (item.kind === 'step')
          return { index: i, id: item.step.id, kind: 'step' as const, label: String(item.stepIndex + 1) }
        if (item.kind === 'cert')
          return { index: i, id: `cert-${item.certId}`, kind: 'cert' as const }
        if (item.kind === 'find-contracts')
          return { index: i, id: 'find-contracts-section', kind: 'find' as const }
        return null
      })
      .filter(Boolean) as {
        index: number
        id: string
        kind: 'step' | 'cert' | 'find'
        label?: string
      }[]
  }, [guideItems])

  const scrollToItem = useCallback((index: number) => {
    setActiveIndex(index)
    smoothScrollToElement(cardRefs.current[index], { block: 'center' })
  }, [setActiveIndex])

  useEffect(() => {
    if (navigableIndices.length > 0 && !navigableIndices.includes(activeIndex)) {
      setActiveIndex(navigableIndices[0])
    }
  }, [navigableIndices, activeIndex, setActiveIndex])

  const handleReset = () => {
    reset()
    resetProfile()
    setCompletionDismissed(false)
  }

  const completedLabels = useMemo(() => {
    if (!profile) return []
    return trackableIds
      .filter((id) => completed.has(id))
      .map((id) => {
        if (id === 'find-contracts-section') return 'Find Contracts'
        if (id.startsWith('cert-')) {
          const cert = certs.find((c) => `cert-${c.id}` === id)
          return cert?.title ?? id
        }
        const step = steps.find((s) => s.id === id)
        return step?.title ?? id
      })
  }, [trackableIds, completed, steps, certs, profile])

  const { getReveal, isLocked } = useScrollGuideReveal(
    cardRefs,
    navigableIndices,
    setActiveIndex,
  )

  const guideWrapStyle = (index: number): CSSProperties => ({
    ['--step-reveal' as string]: String(getReveal(index)),
  })

  if (!intakeComplete || !profile) {
    return <IntakeForm onComplete={saveProfile} />
  }

  const activeNavPosition = navigableIndices.indexOf(activeIndex)
  const canGoBack = activeNavPosition > 0
  const canGoForward = activeNavPosition >= 0 && activeNavPosition < navigableIndices.length - 1

  const goPrev = () => {
    if (canGoBack) scrollToItem(navigableIndices[activeNavPosition - 1])
  }
  const goNext = () => {
    if (canGoForward) scrollToItem(navigableIndices[activeNavPosition + 1])
  }

  const goBackToIntake = () => {
    reset()
    resetProfile()
  }

  const certIndices = guideItems
    .map((item, i) => (item.kind === 'cert' ? i : null))
    .filter((i): i is number => i !== null)

  const showCompletionModal = allComplete && !completionDismissed

  return (
    <div className="app">
      <HeroSection
        subtitle={
          <>
            Your roadmap as a {getStructureLabel(profile.businessStructure)} in{' '}
            {getIndustryLabel(profile.industry)}
            {profile.designation !== 'none' && (
              <> · {getDesignationLabel(profile.designation)}</>
            )}
          </>
        }
        onResetProfile={handleReset}
      />

      <div className="sticky-bar">
        <ProgressBar
          completedCount={completedCount}
          total={trackableIds.length}
          progress={progress}
        />
        <div className="sticky-nav-row">
          <button
            type="button"
            className="nav-btn nav-btn--compact btn-ripple"
            onClick={(e) => {
              ripple(e)
              if (activeNavPosition <= 0) goBackToIntake()
              else goPrev()
            }}
            aria-label={activeNavPosition <= 0 ? 'Back to intake questions' : 'Previous step'}
          >
            ← Back
          </button>
          <nav className="step-nav" aria-label="Step navigation">
            {navItems.map((nav) => (
              <button
                key={nav.id}
                type="button"
                className={`step-dot btn-ripple${nav.index === activeIndex ? ' step-dot--active' : ''}${completed.has(nav.id) ? ' step-dot--done' : ''}`}
                onClick={(e) => {
                  ripple(e)
                  scrollToItem(nav.index)
                }}
                aria-label={`Go to ${nav.id}`}
                aria-current={nav.index === activeIndex ? 'step' : undefined}
              >
                {completed.has(nav.id) ? (
                  <IconCheck />
                ) : nav.kind === 'cert' ? (
                  <IconStar />
                ) : nav.kind === 'find' ? (
                  <IconSearch />
                ) : (
                  nav.label
                )}
              </button>
            ))}
          </nav>
          <button
            type="button"
            className="nav-btn nav-btn--compact nav-btn--primary btn-ripple"
            onClick={(e) => {
              ripple(e)
              goNext()
            }}
            disabled={!canGoForward}
            aria-label="Next step"
          >
            Next →
          </button>
        </div>
      </div>

      <main className="steps-container">
        {guideItems.map((item, index) => {
          if (item.kind === 'cert' && certIndices[0] === index) {
            return (
              <div key="cert-scroll" className="cert-scroll-section">
                <div className="cert-scroll-track">
                  {certIndices.map((ci) => {
                    const certItem = guideItems[ci] as Extract<GuideItem, { kind: 'cert' }>
                    const track = certs[certItem.certIndex]
                    return (
                      <div
                        key={track.id}
                        className={`guide-item-wrap${ci === activeIndex ? ' guide-item-wrap--active' : ''}`}
                        data-guide-index={ci}
                        style={guideWrapStyle(ci)}
                        ref={(el) => {
                          cardRefs.current[ci] = el
                        }}
                      >
                        <CertificationCard
                          track={track}
                          isRecommended={isRecommendedCert(track, profile)}
                          isCompleted={completed.has(`cert-${track.id}`)}
                          isActive={ci === activeIndex}
                          isLocked={isLocked(ci)}
                          onToggle={() => toggle(`cert-${track.id}`)}
                          onFocus={() => setActiveIndex(ci)}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          }

          if (item.kind === 'cert') return null

          const wrapKey =
            item.kind === 'section-header'
              ? item.id
              : item.kind === 'step'
                ? item.step.id
                : 'find'

          if (item.kind === 'section-header') {
            return (
              <div key={wrapKey}>
                <div className="section-header reveal reveal--visible">
                  <h2>{item.title}</h2>
                  <p>{item.subtitle}</p>
                </div>
              </div>
            )
          }

          return (
            <div
              key={wrapKey}
              className={`guide-item-wrap${index === activeIndex ? ' guide-item-wrap--active' : ''}`}
              data-guide-index={index}
              style={guideWrapStyle(index)}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
            >
              {item.kind === 'step' && (
                <StepCard
                  step={item.step}
                  index={item.stepIndex}
                  isCompleted={completed.has(item.step.id)}
                  isActive={index === activeIndex}
                  isLocked={isLocked(index)}
                  onToggle={() => toggle(item.step.id)}
                  onFocus={() => setActiveIndex(index)}
                />
              )}
              {item.kind === 'find-contracts' && (
                <FindContractsSection
                  tools={findContractTools}
                  isCompleted={completed.has('find-contracts-section')}
                  isActive={index === activeIndex}
                  isLocked={isLocked(index)}
                  onToggle={() => toggle('find-contracts-section')}
                  onFocus={() => setActiveIndex(index)}
                />
              )}
            </div>
          )
        })}
      </main>

      <footer className="nav-footer">
        <button
          type="button"
          className="nav-btn btn-ripple"
          onClick={(e) => {
            ripple(e)
            if (activeNavPosition <= 0) goBackToIntake()
            else goPrev()
          }}
        >
          ← Back
        </button>
        <span className="nav-indicator">
          Step {activeNavPosition + 1} of {navigableIndices.length} · {completedCount} of{' '}
          {trackableIds.length} complete
        </span>
        <button
          type="button"
          className="nav-btn nav-btn--primary btn-ripple"
          onClick={(e) => {
            ripple(e)
            goNext()
          }}
          disabled={!canGoForward}
        >
          Next →
        </button>
      </footer>

      <Glossary open={glossaryOpen} onToggle={() => setGlossaryOpen((o) => !o)} />

      {showCompletionModal && (
        <CompletionModal
          profile={profile}
          completedItems={completedLabels}
          onClose={() => setCompletionDismissed(true)}
          onStartOver={handleReset}
        />
      )}
    </div>
  )
}

export default App
