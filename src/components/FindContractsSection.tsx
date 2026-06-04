import type { FindContractTool } from '../data/types'

interface FindContractsSectionProps {
  tools: FindContractTool[]
  isCompleted: boolean
  isActive: boolean
  onToggle: () => void
  onFocus: () => void
}

export function FindContractsSection({
  tools,
  isCompleted,
  isActive,
  onToggle,
  onFocus,
}: FindContractsSectionProps) {
  return (
    <section
      className={`step-card find-contracts${isCompleted ? ' step-card--completed' : ''}${isActive ? ' step-card--active' : ''}`}
      id="find-contracts-section"
      onClick={onFocus}
    >
      <div className="step-card-header">
        <div className="step-number" aria-hidden="true">
          {isCompleted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
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
          <span className="checkbox-ui" />
        </label>
      </div>

      <p className="step-explanation">
        Now that your registration foundation is in place, use these three tools to find
        opportunities and research your market.
      </p>

      <div className="find-tools">
        {tools.map((tool) => (
          <div key={tool.id} className="find-tool-card">
            <h3>{tool.title}</h3>
            <p>{tool.description}</p>
            <a
              className="gov-link"
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              {tool.urlLabel}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
