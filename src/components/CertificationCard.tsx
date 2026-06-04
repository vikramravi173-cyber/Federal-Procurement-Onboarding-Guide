import { useState } from 'react'
import type { CertificationTrack } from '../data/types'
import { useInView } from '../hooks/useInView'
import { useRipple } from '../hooks/useRipple'

const CERT_ICONS: Record<string, string> = {
  '8a': '🏛️',
  hubzone: '📍',
  wosb: '👩‍💼',
  sdvosb: '🎖️',
  vosb: '⚔️',
}

interface CertificationCardProps {
  track: CertificationTrack
  isRecommended: boolean
  isCompleted: boolean
  isActive: boolean
  isLocked: boolean
  onToggle: () => void
  onFocus: () => void
}

export function CertificationCard({
  track,
  isRecommended,
  isCompleted,
  isActive,
  isLocked,
  onToggle,
  onFocus,
}: CertificationCardProps) {
  const { ref, inView } = useInView<HTMLElement>()
  const ripple = useRipple()
  const [expanded, setExpanded] = useState(false)
  const [justCompleted, setJustCompleted] = useState(false)

  const handleToggle = () => {
    if (!isCompleted) setJustCompleted(true)
    onToggle()
  }

  return (
    <article
      ref={ref}
      className={`cert-track-card glass-card reveal${inView ? ' reveal--visible' : ''} cert-track-card--${track.id}${isCompleted ? ' step-card--completed' : ''}${isActive ? ' step-card--active' : ''}${isLocked ? ' step-card--locked' : ''}${justCompleted && isCompleted ? ' step-card--pop' : ''}`}
      id={`cert-${track.id}`}
      onClick={onFocus}
    >
      {isLocked && (
        <div className="step-lock-badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
      )}

      <div className="cert-track-icon" aria-hidden="true">
        {CERT_ICONS[track.id] ?? '★'}
      </div>

      <h2 className="cert-track-title">{track.title}</h2>

      {isRecommended && <span className="cert-badge">Recommended for you</span>}

      <span className="cert-timeline-badge">{track.timeline.split('(')[0].trim()}</span>

      <p className="cert-track-preview">
        <strong>Set-aside value:</strong> {track.setAsideValue.slice(0, 80)}…
      </p>

      <button
        type="button"
        className="cert-learn-more btn-ripple"
        onClick={(e) => {
          e.stopPropagation()
          ripple(e)
          setExpanded((v) => !v)
        }}
        aria-expanded={expanded}
      >
        {expanded ? 'Show less' : 'Learn more'}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points={expanded ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
        </svg>
      </button>

      {expanded && (
        <div className="cert-track-expanded">
          <div className="cert-setaside">
            <strong>Annual set-aside value:</strong> {track.setAsideValue}
          </div>
          <div className="cert-eligibility">
            <h3>Eligibility Requirements</h3>
            <ul>
              {track.eligibility.map((req) => (
                <li key={req}>{req}</li>
              ))}
            </ul>
          </div>
          <a
            className="gov-link btn-ripple"
            href={track.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation()
              ripple(e)
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            {track.applyLabel}
          </a>
        </div>
      )}

      <label className="cert-track-checkbox step-checkbox" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggle}
          aria-label={`Mark ${track.title} as reviewed`}
        />
        <span className="checkbox-ui">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" className="check-draw" />
          </svg>
        </span>
      </label>
    </article>
  )
}
