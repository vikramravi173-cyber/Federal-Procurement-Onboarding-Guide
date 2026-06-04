import { useEffect } from 'react'
import type { UserProfile } from '../data/types'
import {
  getDesignationLabel,
  getIndustryLabel,
  getStructureLabel,
} from '../data/personalization'
import { IconCelebration } from './GuideIcons'
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
        <IconCelebration />
        <h2 id="completion-title">You finished the checklist</h2>
        <p className="completion-modal-lead">
          Every step on your roadmap is done. You have what you need to register, find bids, and
          submit your first proposal.
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
            Keep reading
          </button>
          <button type="button" className="btn-ripple btn-ghost reset-btn" onClick={onStartOver}>
            Start over
          </button>
        </div>
      </div>
    </div>
  )
}
