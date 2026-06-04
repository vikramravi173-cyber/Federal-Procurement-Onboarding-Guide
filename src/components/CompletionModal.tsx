import { useEffect } from 'react'
import type { UserProfile } from '../data/types'
import {
  getDesignationLabel,
  getIndustryLabel,
  getStructureLabel,
} from '../data/personalization'
import { burstConfetti } from '../utils/confetti'

interface CompletionModalProps {
  profile: UserProfile
  completedItems: string[]
  onClose: () => void
  onStartOver: () => void
}

export function CompletionModal({
  profile,
  completedItems,
  onClose,
  onStartOver,
}: CompletionModalProps) {
  useEffect(() => {
    burstConfetti('full')
  }, [])

  const handlePrint = () => window.print()

  return (
    <div className="completion-overlay" role="dialog" aria-modal="true" aria-labelledby="completion-title">
      <div className="completion-modal glass-card">
        <div className="completion-modal-icon" aria-hidden="true">
          🎉
        </div>
        <h2 id="completion-title">Congratulations!</h2>
        <p className="completion-modal-lead">
          You&apos;ve completed your entire federal procurement roadmap. You&apos;re ready to pursue
          federal contracts.
        </p>

        <div className="completion-profile glass-card-inner">
          <h3>Your profile</h3>
          <ul>
            <li>
              <strong>Structure:</strong> {getStructureLabel(profile.businessStructure)}
            </li>
            <li>
              <strong>Industry:</strong> {getIndustryLabel(profile.industry)}
            </li>
            <li>
              <strong>Designation:</strong>{' '}
              {profile.designation !== 'none'
                ? getDesignationLabel(profile.designation)
                : 'None selected'}
            </li>
          </ul>
        </div>

        <div className="completion-checklist">
          <h3>Completed checklist</h3>
          <ul>
            {completedItems.map((item) => (
              <li key={item}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" className="check-draw" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="completion-modal-actions">
          <button type="button" className="btn-ripple nav-btn" onClick={handlePrint}>
            Print / Screenshot
          </button>
          <button type="button" className="btn-ripple nav-btn nav-btn--primary" onClick={onClose}>
            Continue exploring
          </button>
          <button type="button" className="btn-ripple reset-btn" onClick={onStartOver}>
            Start over
          </button>
        </div>
      </div>
    </div>
  )
}
