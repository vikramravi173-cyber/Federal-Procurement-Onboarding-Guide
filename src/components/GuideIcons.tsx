const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export function IconCheck({ className = 'guide-icon guide-icon--sm' }: { className?: string }) {
  return (
    <svg {...svgProps} className={className}>
      <polyline points="20 6 9 17 4 12" strokeWidth={2.5} />
    </svg>
  )
}

export function IconStar({ className = 'guide-icon guide-icon--sm' }: { className?: string }) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M12 3l2.2 6.8H21l-5.5 4 2.1 6.7L12 16.5 6.4 20.5l2.1-6.7L3 9.8h6.8L12 3z" />
    </svg>
  )
}

export function IconSearch({ className = 'guide-icon guide-icon--sm' }: { className?: string }) {
  return (
    <svg {...svgProps} className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  )
}

export function IconLink({ className = 'guide-icon guide-icon--md' }: { className?: string }) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

export function IconChart({ className = 'guide-icon guide-icon--md' }: { className?: string }) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 16v-4M12 16V8M16 16v-7" />
    </svg>
  )
}

export function IconHandshake({ className = 'guide-icon guide-icon--md' }: { className?: string }) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M7 11h3l1.5-2.5a2 2 0 0 1 3.4 0L16 11h1a2 2 0 0 1 2 2v1.5a3.5 3.5 0 0 1-3.5 3.5H10.5A3.5 3.5 0 0 1 7 14.5V13a2 2 0 0 1 0-2z" />
      <path d="M8 17c1.2.8 2.5 1.2 4 1.2s2.8-.4 4-1.2" />
    </svg>
  )
}

export function IconCelebration() {
  return (
    <span className="guide-icon-celebration" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3l1.4 4.3H18l-3.6 2.6 1.4 4.3L12 11.6 8.2 14.2l1.4-4.3L6 7.3h4.6L12 3z"
        />
        <path strokeLinecap="round" d="M5 4l1 2M19 4l-1 2M4 19l2-1M20 19l-2-1" />
      </svg>
    </span>
  )
}

export type FindContractToolIconId = 'sam-opportunities' | 'usaspending' | 'sub-net'

export function FindContractToolIcon({ id }: { id: string }) {
  return (
    <span className="find-tool-icon" aria-hidden="true">
      {id === 'sam-opportunities' && <IconSearch className="guide-icon guide-icon--md" />}
      {id === 'usaspending' && <IconChart className="guide-icon guide-icon--md" />}
      {id === 'sub-net' && <IconHandshake className="guide-icon guide-icon--md" />}
      {id !== 'sam-opportunities' && id !== 'usaspending' && id !== 'sub-net' && (
        <IconLink className="guide-icon guide-icon--md" />
      )}
    </span>
  )
}
