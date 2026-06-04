import { useCallback, useMemo, useRef, useState } from 'react'
import { CertificationCard } from './components/CertificationCard'
import { FindContractsSection } from './components/FindContractsSection'
import { Glossary } from './components/Glossary'
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
import { useUserProfile } from './hooks/useUserProfile'
import './App.css'

type GuideItem =
  | { kind: 'step'; step: OnboardingStep; stepIndex: number }
  | { kind: 'section-header'; id: string; title: string; subtitle: string }
  | { kind: 'cert'; certId: string; certIndex: number }
  | { kind: 'find-contracts' }

function App() {
  const { profile, intakeComplete, saveProfile, resetProfile } = useUserProfile()
  const [glossaryOpen, setGlossaryOpen] = useState(false)
  const cardRefs = useRef<(HTMLElement | null)[]>([])

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

  const {
    completed,
    toggle,
    reset,
    completedCount,
    progress,
    allComplete,
    activeIndex,
    setActiveIndex,
  } = useProgressTracker(trackableIds)

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

  const navItems = useMemo(() => {
    return guideItems
      .map((item, i) => {
        if (item.kind === 'section-header') return null
        if (item.kind === 'step') return { index: i, id: item.step.id, label: String(item.stepIndex + 1) }
        if (item.kind === 'cert') return { index: i, id: `cert-${item.certId}`, label: '★' }
        return { index: i, id: 'find-contracts-section', label: '🔍' }
      })
      .filter(Boolean) as { index: number; id: string; label: string }[]
  }, [guideItems])

  const scrollToItem = useCallback((index: number) => {
    setActiveIndex(index)
    cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [setActiveIndex])

  const handleReset = () => {
    reset()
    resetProfile()
  }

  if (!intakeComplete || !profile) {
    return <IntakeForm onComplete={saveProfile} />
  }

  const activeNavIndex = navItems.findIndex((n) => n.index === activeIndex)
  const goPrev = () => {
    if (activeNavIndex > 0) scrollToItem(navItems[activeNavIndex - 1].index)
  }
  const goNext = () => {
    if (activeNavIndex < navItems.length - 1) scrollToItem(navItems[activeNavIndex + 1].index)
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-badge">Personalized Guide</div>
        <h1>Federal Procurement Onboarding</h1>
        <p className="hero-subtitle">
          Your roadmap as a {getStructureLabel(profile.businessStructure)} in{' '}
          {getIndustryLabel(profile.industry)}
          {profile.designation !== 'none' && (
            <> · {getDesignationLabel(profile.designation)}</>
          )}
        </p>
        <button type="button" className="reset-profile-btn" onClick={handleReset}>
          Retake intake
        </button>
      </header>

      <div className="sticky-bar">
        <ProgressBar
          completedCount={completedCount}
          total={trackableIds.length}
          progress={progress}
        />
        <nav className="step-nav" aria-label="Step navigation">
          {navItems.map((nav) => (
            <button
              key={nav.id}
              type="button"
              className={`step-dot${nav.index === activeIndex ? ' step-dot--active' : ''}${completed.has(nav.id) ? ' step-dot--done' : ''}`}
              onClick={() => scrollToItem(nav.index)}
              aria-label={`Go to ${nav.id}`}
              aria-current={nav.index === activeIndex ? 'step' : undefined}
            >
              {completed.has(nav.id) ? '✓' : nav.label}
            </button>
          ))}
        </nav>
      </div>

      <main className="steps-container">
        {guideItems.map((item, index) => (
          <div
            key={item.kind === 'section-header' ? item.id : item.kind === 'step' ? item.step.id : item.kind === 'cert' ? item.certId : 'find'}
            ref={(el) => {
              if (item.kind !== 'section-header') cardRefs.current[index] = el
            }}
          >
            {item.kind === 'section-header' && (
              <div className="section-header">
                <h2>{item.title}</h2>
                <p>{item.subtitle}</p>
              </div>
            )}
            {item.kind === 'step' && (
              <StepCard
                step={item.step}
                index={item.stepIndex}
                isCompleted={completed.has(item.step.id)}
                isActive={index === activeIndex}
                onToggle={() => toggle(item.step.id)}
                onFocus={() => setActiveIndex(index)}
              />
            )}
            {item.kind === 'cert' && (
              <CertificationCard
                track={certs[item.certIndex]}
                isRecommended={isRecommendedCert(certs[item.certIndex], profile)}
                isCompleted={completed.has(`cert-${certs[item.certIndex].id}`)}
                isActive={index === activeIndex}
                onToggle={() => toggle(`cert-${certs[item.certIndex].id}`)}
                onFocus={() => setActiveIndex(index)}
              />
            )}
            {item.kind === 'find-contracts' && (
              <FindContractsSection
                tools={findContractTools}
                isCompleted={completed.has('find-contracts-section')}
                isActive={index === activeIndex}
                onToggle={() => toggle('find-contracts-section')}
                onFocus={() => setActiveIndex(index)}
              />
            )}
          </div>
        ))}
      </main>

      <footer className="nav-footer">
        <button type="button" className="nav-btn" onClick={goPrev} disabled={activeNavIndex <= 0}>
          ← Previous
        </button>
        <span className="nav-indicator">
          {completedCount} of {trackableIds.length} complete
        </span>
        <button
          type="button"
          className="nav-btn nav-btn--primary"
          onClick={goNext}
          disabled={activeNavIndex >= navItems.length - 1}
        >
          Next →
        </button>
      </footer>

      <Glossary open={glossaryOpen} onToggle={() => setGlossaryOpen((o) => !o)} />

      {allComplete && (
        <div className="completion-banner" role="status">
          <span>🎉</span>
          <div>
            <strong>You&apos;ve completed your roadmap!</strong>
            <p>You&apos;re ready to pursue federal contracts. Good luck!</p>
          </div>
          <button type="button" className="reset-btn" onClick={handleReset}>
            Start over
          </button>
        </div>
      )}
    </div>
  )
}

export default App
