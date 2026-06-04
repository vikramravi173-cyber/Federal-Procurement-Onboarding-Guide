import { useState } from 'react'
import type { OnboardingStep } from '../data/types'
import { capabilityStatementMustInclude } from '../data/steps'
import { useInView } from '../hooks/useInView'
import { useRipple } from '../hooks/useRipple'

interface StepCardProps {
  step: OnboardingStep
  index: number
  isCompleted: boolean
  isActive: boolean
  isLocked: boolean
  onToggle: () => void
  onFocus: () => void
}

export function StepCard({
  step,
  index,
  isCompleted,
  isActive,
  isLocked,
  onToggle,
  onFocus,
}: StepCardProps) {
  const { ref, inView } = useInView<HTMLElement>()
  const ripple = useRipple()
  const [justCompleted, setJustCompleted] = useState(false)
  const isCapability = step.id === 'capability-statement'

  const handleToggle = () => {
    if (!isCompleted) setJustCompleted(true)
    onToggle()
  }

  return (
    <article
      ref={ref}
      className={`step-card glass-card reveal${inView ? ' reveal--visible' : ''}${isCompleted ? ' step-card--completed' : ''}${isActive ? ' step-card--active' : ''}${isLocked ? ' step-card--locked' : ''}${justCompleted && isCompleted ? ' step-card--pop' : ''}`}
      id={`step-${step.id}`}
      onClick={onFocus}
    >
      <span className="step-watermark" aria-hidden="true">
        {index + 1}
      </span>

      {isLocked && (
        <div className="step-lock-badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
      )}

      <div className="step-card-header">
        <div className="step-number" aria-hidden="true">
          {isCompleted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="check-pop">
              <polyline points="20 6 9 17 4 12" className="check-draw" />
            </svg>
          ) : (
            index + 1
          )}
        </div>
        <h2 className="step-title">
          {step.title}
          <span className="time-pill" data-tooltip={step.timeEstimate}>
            {step.timeEstimate.split('(')[0].trim().slice(0, 28)}
            {step.timeEstimate.length > 28 ? '…' : ''}
          </span>
        </h2>
        <label className="step-checkbox" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleToggle}
            aria-label={`Mark step ${index + 1} as complete`}
          />
          <span className="checkbox-ui">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" className="check-draw" />
            </svg>
          </span>
        </label>
      </div>

      <div className="step-explanation-block">
        <p className="step-explanation">{step.explanation}</p>
        {step.industryNote && (
          <p className="personalized-note">
            <strong>For your industry:</strong> {step.industryNote}
          </p>
        )}
        {step.structureNote && (
          <p className="personalized-note">
            <strong>For your business structure:</strong> {step.structureNote}
          </p>
        )}
      </div>

      {isCapability && (
        <div className="capability-details glass-card-inner">
          <h3>What a Capability Statement Must Include</h3>
          <ul>
            {capabilityStatementMustInclude.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="capability-why">
            Contracting officers request capability statements <em>before</em> any formal
            bid to quickly evaluate whether your business is worth inviting to compete.
            Having one ready — and tailored to each agency — is essential.
          </p>
        </div>
      )}

      <a
        className="gov-link btn-ripple"
        href={step.govLink.url}
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

      <aside className={`mistake-callout${isActive ? ' mistake-callout--visible' : ''}`}>
        <div className="mistake-callout-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          Common mistake
        </div>
        <p>{step.commonMistake}</p>
      </aside>
    </article>
  )
}
