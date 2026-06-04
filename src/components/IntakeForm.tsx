import { useState } from 'react'
import type {
  BusinessDesignation,
  BusinessStructure,
  CertificationId,
  IndustryCategory,
  UserProfile,
} from '../data/types'

interface IntakeFormProps {
  onComplete: (profile: UserProfile) => void
}

const structures: { value: BusinessStructure; label: string }[] = [
  { value: 'sole-proprietor', label: 'Sole Proprietor' },
  { value: 'llc', label: 'LLC' },
  { value: 's-corp', label: 'S-Corp' },
  { value: 'c-corp', label: 'C-Corp' },
]

const industries: { value: IndustryCategory; label: string }[] = [
  { value: 'construction', label: 'Construction' },
  { value: 'it-tech', label: 'IT / Tech' },
  { value: 'professional-services', label: 'Professional Services' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'other', label: 'Other' },
]

const designations: { value: BusinessDesignation; label: string }[] = [
  { value: 'none', label: 'None / Not sure yet' },
  { value: 'veteran', label: 'Veteran-Owned (SDVOSB / VOSB)' },
  { value: 'woman-owned', label: 'Woman-Owned (WOSB)' },
  { value: 'minority-owned', label: 'Minority-Owned (8(a) eligible)' },
  { value: 'hubzone', label: 'HUBZone Located' },
  { value: 'multiple', label: 'Multiple Designations' },
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
  const canAdvance = current.value !== null && (step < 2 || designation !== 'multiple' || multipleDesignations.length > 0)

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1)
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
    <div className="intake">
      <div className="intake-header">
        <div className="hero-badge">Getting Started</div>
        <h1>Federal Contract Procurement Guide for small businesses</h1>
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

      <div className="intake-card">
        <h2>{current.title}</h2>
        <p className="intake-subtitle">{current.subtitle}</p>

        <div className="intake-options">
          {current.options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`intake-option${current.value === opt.value ? ' intake-option--selected' : ''}`}
              onClick={() => current.setValue(opt.value as never)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {step === 2 && designation === 'multiple' && (
          <div className="intake-multi">
            <p className="intake-multi-label">Select all that apply:</p>
            <div className="intake-multi-grid">
              {multiOptions.map((opt) => (
                <label key={opt.value} className="intake-multi-item">
                  <input
                    type="checkbox"
                    checked={multipleDesignations.includes(opt.value)}
                    onChange={() => toggleMulti(opt.value)}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="intake-nav">
        {step > 0 && (
          <button type="button" className="nav-btn" onClick={() => setStep(step - 1)}>
            ← Back
          </button>
        )}
        <button
          type="button"
          className="nav-btn nav-btn--primary intake-next"
          onClick={handleNext}
          disabled={!canAdvance}
        >
          {step < 2 ? 'Continue →' : 'Build My Roadmap →'}
        </button>
      </div>
    </div>
  )
}
