import type { CertificationTrack } from '../data/types'

interface CertificationCardProps {
  track: CertificationTrack
  isRecommended: boolean
  isCompleted: boolean
  isActive: boolean
  onToggle: () => void
  onFocus: () => void
}

export function CertificationCard({
  track,
  isRecommended,
  isCompleted,
  isActive,
  onToggle,
  onFocus,
}: CertificationCardProps) {
  return (
    <article
      className={`step-card cert-card${isCompleted ? ' step-card--completed' : ''}${isActive ? ' step-card--active' : ''}${isRecommended ? ' cert-card--recommended' : ''}`}
      id={`cert-${track.id}`}
      onClick={onFocus}
    >
      <div className="step-card-header">
        <div className="step-number cert-icon" aria-hidden="true">
          {isCompleted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            '★'
          )}
        </div>
        <div className="cert-header-text">
          <h2 className="step-title">{track.title}</h2>
          {isRecommended && <span className="cert-badge">Recommended for you</span>}
        </div>
        <label className="step-checkbox" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={onToggle}
            aria-label={`Mark ${track.title} as reviewed`}
          />
          <span className="checkbox-ui" />
        </label>
      </div>

      <div className="cert-meta">
        <div className="time-estimate">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {track.timeline}
        </div>
        <div className="cert-setaside">
          <strong>Annual set-aside value:</strong> {track.setAsideValue}
        </div>
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
        className="gov-link"
        href={track.applyUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        {track.applyLabel}
      </a>
    </article>
  )
}
