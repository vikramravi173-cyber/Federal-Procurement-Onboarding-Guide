import { useState } from 'react'
import { glossaryTerms } from '../data/glossary'

interface GlossaryProps {
  open: boolean
  onToggle: () => void
}

export function Glossary({ open, onToggle }: GlossaryProps) {
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null)

  return (
    <>
      <button
        type="button"
        className="glossary-fab"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={open ? 'Close glossary' : 'Open glossary'}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
        Glossary
      </button>

      {open && (
        <div className="glossary-overlay" onClick={onToggle} role="presentation">
          <div
            className="glossary-panel"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Federal procurement glossary"
          >
            <div className="glossary-panel-header">
              <h2>Glossary</h2>
              <button type="button" className="glossary-close" onClick={onToggle} aria-label="Close">
                ×
              </button>
            </div>
            <div className="glossary-list">
              {glossaryTerms.map(({ term, definition }) => (
                <div key={term} className="glossary-item">
                  <button
                    type="button"
                    className={`glossary-term${expandedTerm === term ? ' glossary-term--open' : ''}`}
                    onClick={() => setExpandedTerm(expandedTerm === term ? null : term)}
                    aria-expanded={expandedTerm === term}
                  >
                    {term}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {expandedTerm === term && <p className="glossary-definition">{definition}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
