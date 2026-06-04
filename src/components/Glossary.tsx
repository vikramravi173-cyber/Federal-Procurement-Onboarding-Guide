import { useMemo, useState } from 'react'
import { glossaryTerms } from '../data/glossary'
import { useRipple } from '../hooks/useRipple'

interface GlossaryProps {
  open: boolean
  onToggle: () => void
}

export function Glossary({ open, onToggle }: GlossaryProps) {
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const ripple = useRipple()

  const sortedTerms = useMemo(
    () => [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term)),
    [],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return sortedTerms
    return sortedTerms.filter(
      (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q),
    )
  }, [search, sortedTerms])

  return (
    <>
      <button
        type="button"
        className="glossary-fab btn-ripple"
        onClick={(e) => {
          ripple(e)
          onToggle()
        }}
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
            className="glossary-panel glass-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Federal procurement glossary"
          >
            <div className="glossary-panel-header">
              <h2>Glossary</h2>
              <button
                type="button"
                className="glossary-close btn-ripple"
                onClick={(e) => {
                  ripple(e)
                  onToggle()
                }}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="glossary-search-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                className="glossary-search"
                placeholder="Search terms…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search glossary terms"
              />
            </div>

            <div className="glossary-list">
              {filtered.map(({ term, definition }) => {
                const highlight = search.trim().length > 0
                return (
                  <div
                    key={term}
                    className={`glossary-item${highlight ? ' glossary-item--highlight' : ''}`}
                  >
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
                )
              })}
              {filtered.length === 0 && (
                <p className="glossary-empty">No terms match your search.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
