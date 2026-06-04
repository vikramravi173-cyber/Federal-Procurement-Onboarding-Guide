import type { OnboardingStep } from '../data/steps'

interface StepCardProps {
  step: OnboardingStep
  index: number
  isCompleted: boolean
  isActive: boolean
  onToggle: () => void
  onFocus: () => void
}

export function StepCard({
  step,
  index,
  isCompleted,
  isActive,
  onToggle,
  onFocus,
}: StepCardProps) {
  return (
    <article
      className={`step-card${isCompleted ? ' step-card--completed' : ''}${isActive ? ' step-card--active' : ''}`}
      id={`step-${step.id}`}
      onClick={onFocus}
    >
      <div className="step-card-header">
        <div className="step-number" aria-hidden="true">
          {isCompleted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            index + 1
          )}
        </div>
        <h2 className="step-title">{step.title}</h2>
        <label className="step-checkbox" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={onToggle}
            aria-label={`Mark step ${index + 1} as complete`}
          />
          <span className="checkbox-ui" />
        </label>
      </div>

      <p className="step-explanation">{step.explanation}</p>

      <a
        className="gov-link"
        href={step.govLink.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        {step.govLink.label}
      </a>

      <aside className="why-callout">
        <div className="why-callout-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          Why this matters
        </div>
        <p>{step.whyItMatters}</p>
      </aside>
    </article>
  )
}
