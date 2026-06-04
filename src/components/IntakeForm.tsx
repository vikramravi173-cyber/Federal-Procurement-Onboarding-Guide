import { useState } from 'react'
import type {
  BusinessDesignation,
  BusinessStructure,
  CertificationId,
  IndustryCategory,
  UserProfile,
} from '../data/types'
import { useRipple } from '../hooks/useRipple'
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

export function IntakeForm({ onComplete }: IntakeFormProps) {
  const [step, setStep] = useState(0)
  const [slideDir, setSlideDir] = useState<'forward' | 'back'>('forward')
  const [structure, setStructure] = useState<BusinessStructure | null>(null)
  const [industry, setIndustry] = useState<IndustryCategory | null>(null)
  const [designation, setDesignation] = useState<BusinessDesignation | null>(null)
  const [multipleDesignations, setMultipleDesignations] = useState<CertificationId[]>([])
  const ripple = useRipple()

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

  const goToStep = (next: number) => {
    setSlideDir(next > step ? 'forward' : 'back')
    setStep(next)
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

  return (
    <div className="intake-modal-overlay">
      <div className="intake-modal glass-card" role="dialog" aria-modal="true" aria-labelledby="intake-title">
        <div className="intake-header">
          <div className="hero-badge">Getting Started</div>
          <h1 id="intake-title">Federal Contract Procurement Guide for Small Businesses</h1>
          <p className="hero-subtitle">
            Answer 3 quick questions so we can personalize your roadmap.
          </p>
        </div>

        <div className="intake-progress">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`intake-dot${i === step ? ' intake-dot--active' : ''}${i < step ? ' intake-dot--done' : ''}`}
            />
          ))}
        </div>

        <div
          key={step}
          className={`intake-slide intake-slide--${slideDir}`}
        >
          <div className="intake-card glass-card-inner">
            <h2>{current.title}</h2>
            <p className="intake-subtitle">{current.subtitle}</p>

            <div className="intake-options">
              {current.options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`intake-option-card${current.value === opt.value ? ' intake-option-card--selected' : ''}`}
                  onClick={(e) => {
                    ripple(e)
                    current.setValue(opt.value as never)
                  }}
                >
                  <IntakeIcon name={opt.icon} />
                  <span className="intake-option-label">{opt.label}</span>
                  {current.value === opt.value && (
                    <span className="intake-option-check" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" className="check-draw" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>

            {step === 2 && designation === 'multiple' && (
              <div className="intake-multi">
                <p className="intake-multi-label">Select all that apply:</p>
                <div className="intake-multi-grid">
                  {multiOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`intake-option-card intake-option-card--compact${multipleDesignations.includes(opt.value) ? ' intake-option-card--selected' : ''}`}
                      onClick={(e) => {
                        ripple(e)
                        toggleMulti(opt.value)
                      }}
                    >
                      <span className="intake-option-label">{opt.label}</span>
                      {multipleDesignations.includes(opt.value) && (
                        <span className="intake-option-check" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" className="check-draw" />
                          </svg>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="intake-nav">
          <button
            type="button"
            className="nav-btn btn-ripple"
            onClick={(e) => {
              ripple(e)
              goToStep(step - 1)
            }}
            disabled={step === 0}
          >
            ← Back
          </button>
          <button
            type="button"
            className="nav-btn nav-btn--primary btn-ripple intake-next"
            onClick={(e) => {
              ripple(e)
              handleNext()
            }}
            disabled={!canAdvance}
          >
            {step < 2 ? 'Continue →' : 'Build My Roadmap →'}
          </button>
        </div>
      </div>
    </div>
  )
}
