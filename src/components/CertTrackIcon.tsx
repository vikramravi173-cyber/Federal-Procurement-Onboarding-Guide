import type { CertificationId } from '../data/types'

interface CertTrackIconProps {
  id: CertificationId
}

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

/** Gold stroke icons for certification track cards (replaces emojis). */
export function CertTrackIcon({ id }: CertTrackIconProps) {
  return (
    <span className="cert-track-icon">
      <svg {...svgProps}>
        {id === '8a' && (
          <>
            <path d="M4 20V10l8-5 8 5v10" />
            <path d="M4 20h16" />
            <path d="M9 20v-5h6v5" />
            <path d="M12 5v3" />
          </>
        )}
        {id === 'hubzone' && (
          <>
            <path d="M12 21s6-5.33 6-10a6 6 0 1 0-12 0c0 4.67 6 10 6 10z" />
            <circle cx="12" cy="11" r="2" />
          </>
        )}
        {id === 'wosb' && (
          <>
            <circle cx="12" cy="8" r="3.25" />
            <path d="M6 20v-1.25a6 6 0 0 1 12 0V20" />
            <path d="M12 11v2" />
          </>
        )}
        {id === 'sdvosb' && (
          <>
            <circle cx="12" cy="14" r="5" />
            <path d="M12 3v3M9.5 6.5L12 9l2.5-2.5M7 9l2 1.5M17 9l-2 1.5" />
          </>
        )}
        {id === 'vosb' && (
          <>
            <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z" />
          </>
        )}
      </svg>
    </span>
  )
}
