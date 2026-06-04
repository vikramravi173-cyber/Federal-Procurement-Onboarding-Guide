import type { FindContractTool } from '../data/types'
import { useInView } from '../hooks/useInView'
import { useRipple } from '../hooks/useRipple'

const TOOL_ICONS: Record<string, string> = {
  'sam-opportunities': '🔎',
  usaspending: '📊',
  'sub-net': '🤝',
}

interface FindContractsSectionProps {
  tools: FindContractTool[]
  isCompleted: boolean
  isActive: boolean
  isLocked: boolean
  onToggle: () => void
  onFocus: () => void
}

export function FindContractsSection({
  tools,
  isCompleted,
  isActive,
  isLocked,
  onToggle,
  onFocus,
}: FindContractsSectionProps) {
  const { ref, inView } = useInView<HTMLElement>()
  const ripple = useRipple()

  return (
    <section
      ref={ref}
      className={`find-contracts-section reveal${inView ? ' reveal--visible' : ''}${isCompleted ? ' step-card--completed' : ''}${isActive ? ' step-card--active' : ''}${isLocked ? ' step-card--locked' : ''}`}
      id="find-contracts-section"
      onClick={onFocus}
    >
      <article className="step-card glass-card find-contracts-header">
        <div className="step-card-header">
          <div className="step-number" aria-hidden="true">
            {isCompleted ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" className="check-draw" />
              </svg>
            ) : (
              '🔍'
            )}
          </div>
          <h2 className="step-title">Find Contracts</h2>
          <label className="step-checkbox" onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={onToggle}
              aria-label="Mark Find Contracts section as complete"
            />
            <span className="checkbox-ui">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" className="check-draw" />
              </svg>
            </span>
          </label>
        </div>

        <p className="step-explanation">
          Now that your registration foundation is in place, use these three tools to find
          opportunities and research your market.
        </p>
      </article>

      <div className="find-tools-grid">
        {tools.map((tool) => (
          <div key={tool.id} className="find-tool-card glass-card">
            <div className="find-tool-bg" aria-hidden="true" />
            <span className="find-tool-icon" aria-hidden="true">
              {TOOL_ICONS[tool.id] ?? '🔗'}
            </span>
            <h3>{tool.title}</h3>
            <p className="find-tool-oneline">
              {tool.description.split('.')[0]}.
            </p>
            <a
              className="find-visit-btn btn-ripple"
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation()
                ripple(e)
              }}
            >
              Visit
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
