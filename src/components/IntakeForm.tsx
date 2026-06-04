import { useState } from 'react'
import type {
  BusinessDesignation,
  BusinessStructure,
  CertificationId,
  IndustryCategory,
  UserProfile,
} from '../data/types'
import { GoldFrameBorder } from './GoldFrameBorder'
import { IntakeSpaceBackground } from './IntakeSpaceBackground'
import { IntakeIcon, type IntakeIconName } from './IntakeIcon'

interface IntakeFormProps {
  onComplete: (profile: UserProfile) => void
}

const structures: { value: BusinessStructure; label: string; icon: IntakeIconName }[] = [
  { value: 'sole-proprietor', label: 'Sole Proprietor', icon: 'sole-proprietor' },
  { value: 'llc', label: 'LLC', icon: 'llc' },
  { value: 's-corp', label: 'S-Corp', icon: 's-corp' },
  { value: 'c-corp', label: 'C-Corp', icon: 'c-corp' },
]

const industries: { value: IndustryCategory; label: string; icon: IntakeIconName }[] = [
  { value: 'construction', label: 'Construction', icon: 'construction' },
  { value: 'it-tech', label: 'IT / Tech', icon: 'it-tech' },
  { value: 'professional-services', label: 'Professional Services', icon: 'professional-services' },
  { value: 'manufacturing', label: 'Manufacturing', icon: 'manufacturing' },
  { value: 'healthcare', label: 'Healthcare', icon: 'healthcare' },
  { value: 'transportation-logistics', label: 'Transportation & Logistics', icon: 'transportation-logistics' },
  { value: 'facilities-maintenance', label: 'Facilities & Maintenance', icon: 'facilities-maintenance' },
  { value: 'education-training', label: 'Education & Training', icon: 'education-training' },
  { value: 'defense', label: 'Defense', icon: 'defense' },
  { value: 'other', label: 'Other', icon: 'other' },
]

const designations: { value: BusinessDesignation; label: string; icon: IntakeIconName }[] = [
  { value: 'none', label: 'None / Not sure yet', icon: 'none' },
  { value: 'veteran', label: 'Veteran-Owned (SDVOSB / VOSB)', icon: 'veteran' },
  { value: 'woman-owned', label: 'Woman-Owned (WOSB)', icon: 'woman-owned' },
  { value: 'economically-disadvantaged-woman', label: 'Economically Disadvantaged Woman-Owned (EDWOSB)', icon: 'economically-disadvantaged-woman' },
  { value: 'minority-owned', label: 'Minority-Owned (8(a) eligible)', icon: 'minority-owned' },
  { value: 'native-american-owned', label: 'Native American-Owned (8(a) eligible)', icon: 'native-american-owned' },
  { value: 'hubzone', label: 'HUBZone Located', icon: 'hubzone' },
  { value: 'multiple', label: 'Multiple Designations', icon: 'multiple' },
]

const multiOptions: { value: CertificationId; label: string }[] = [
  { value: '8a', label: '8(a) Business Development' },
  { value: 'hubzone', label: 'HUBZone' },
  { value: 'wosb', label: 'WOSB' },
  { value: 'sdvosb', label: 'SDVOSB' },
  { value: 'vosb', label: 'VOSB' },
]

const QUESTION_COUNT = 3
const SLIDE_MS = 300

export function IntakeForm({ onComplete }: IntakeFormProps) {
  const [step, setStep] = useState(0)
  const [slideDir, setSlideDir] = useState<'forward' | 'back'>('forward')
  const [slidePhase, setSlidePhase] = useState<'enter' | 'exit'>('enter')
  const [structure, setStructure] = useState<BusinessStructure | null>(null)
  const [industry, setIndustry] = useState<IndustryCategory | null>(null)
  const [designation, setDesignation] = useState<BusinessDesignation | null>(null)
  const [multipleDesignations, setMultipleDesignations] = useState<CertificationId[]>([])

  const questions = [
    {
      title: 'What is your business structure?',
      subtitle: 'This affects how you register in SAM.gov and what documents you need.',
      options: structures,
      value: structure,
      setValue: setStructure,
    },
    {
      title: 'What industry best describes your business?',
      subtitle: 'We will tailor NAICS guidance and opportunity search tips to your sector.',
      options: industries,
      value: industry,
      setValue: setIndustry,
    },
    {
      title: 'Do you have a small business designation?',
      subtitle: 'This determines which certification tracks we highlight for you.',
      options: designations,
      value: designation,
      setValue: setDesignation,
    },
  ]

  const current = questions[step]
  const canAdvance =
    current.value !== null &&
    (step < 2 || designation !== 'multiple' || multipleDesignations.length > 0)

  const progressPercent = ((step + 1) / QUESTION_COUNT) * 100

  const goToStep = (next: number) => {
    if (next === step || next < 0 || next > 2) return
    setSlideDir(next > step ? 'forward' : 'back')
    setSlidePhase('exit')
    window.setTimeout(() => {
      setStep(next)
      setSlidePhase('enter')
    }, SLIDE_MS)
  }

  const handleNext = () => {
    if (step < 2) {
      goToStep(step + 1)
    } else if (structure && industry && designation) {
      onComplete({
        businessStructure: structure,
        industry,
        designation,
        multipleDesignations: designation === 'multiple' ? multipleDesignations : [],
      })
    }
  }

  const toggleMulti = (id: CertificationId) => {
    setMultipleDesignations((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
    )
  }

  const slideClass =
    slidePhase === 'exit'
      ? `intake-slide--exit intake-slide--exit-${slideDir}`
      : `intake-slide--enter intake-slide--enter-${slideDir}`

  return (
    <div className="intake-modal-overlay">
      <div className="intake-space-bg" aria-hidden="true">
        <IntakeSpaceBackground />
      </div>
      <div
        className={`intake-modal intake-modal--step-${step}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="intake-title"
      >
        <div className="intake-modal__frame" aria-hidden="true">
          <GoldFrameBorder key={step} />
        </div>

        <div className="intake-header">
          <div className="hero-badge">Getting Started</div>
          <h1 id="intake-title">Federal Contract Procurement Guide for Small Businesses</h1>
          <p className="intake-header-tagline">
            Answer 3 quick questions so we can personalize your roadmap.
          </p>
          <div
            className="intake-progress-bar"
            role="progressbar"
            aria-valuenow={step + 1}
            aria-valuemin={1}
            aria-valuemax={QUESTION_COUNT}
            aria-label={`Question ${step + 1} of ${QUESTION_COUNT}`}
          >
            <div
              className="intake-progress-bar__fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="intake-body">
          <div className={`intake-slide ${slideClass}`}>
            <div className="intake-question">
              <h2 className="intake-question-title">{current.title}</h2>
              <div className={`intake-callout${slidePhase === 'enter' ? ' intake-callout--draw' : ''}`}>
                <p className="intake-subtitle">{current.subtitle}</p>
              </div>

              <div className="intake-options">
                {current.options.map((opt) => {
                  const selected = current.value === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      className={`intake-pill${selected ? ' intake-pill--selected' : ''}`}
                      onClick={() => current.setValue(opt.value as never)}
                    >
                      <IntakeIcon name={opt.icon} />
                      <span className="intake-pill-label">{opt.label}</span>
                      {selected && (
                        <span className="intake-pill-check" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              {step === 2 && designation === 'multiple' && (
                <div className="intake-multi">
                  <p className="intake-multi-label">Select all that apply:</p>
                  <div className="intake-options">
                    {multiOptions.map((opt) => {
                      const selected = multipleDesignations.includes(opt.value)
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          className={`intake-pill intake-pill--no-icon${selected ? ' intake-pill--selected' : ''}`}
                          onClick={() => toggleMulti(opt.value)}
                        >
                          <span className="intake-pill-label">{opt.label}</span>
                          {selected && (
                            <span className="intake-pill-check" aria-hidden="true">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="intake-footer">
          <button
            type="button"
            className={`intake-continue${canAdvance ? ' intake-continue--ready' : ''}`}
            onClick={handleNext}
            disabled={!canAdvance}
          >
            <span>{step < 2 ? 'Continue' : 'Build My Roadmap'}</span>
            <span className="intake-continue-arrow" aria-hidden="true">
              →
            </span>
          </button>
          <button
            type="button"
            className="intake-back"
            onClick={() => goToStep(step - 1)}
            disabled={step === 0}
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  )
}
