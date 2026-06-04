export type IntakeIconName =
  | 'sole-proprietor'
  | 'llc'
  | 's-corp'
  | 'c-corp'
  | 'construction'
  | 'it-tech'
  | 'professional-services'
  | 'manufacturing'
  | 'healthcare'
  | 'transportation-logistics'
  | 'facilities-maintenance'
  | 'education-training'
  | 'defense'
  | 'other'
  | 'none'
  | 'veteran'
  | 'woman-owned'
  | 'minority-owned'
  | 'native-american-owned'
  | 'economically-disadvantaged-woman'
  | 'hubzone'
  | 'multiple'

interface IntakeIconProps {
  name: IntakeIconName
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

export function IntakeIcon({ name }: IntakeIconProps) {
  return (
    <span className="intake-option-icon">
      <svg {...svgProps}>
        {name === 'sole-proprietor' && (
          <>
            <circle cx="12" cy="8" r="3.25" />
            <path d="M6 20v-1.5a6 6 0 0 1 12 0V20" />
          </>
        )}
        {name === 'llc' && (
          <>
            <rect x="4" y="8" width="16" height="12" rx="1" />
            <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M8 13h8M8 17h5" />
          </>
        )}
        {name === 's-corp' && (
          <>
            <path d="M4 19V5" />
            <path d="M4 19h16" />
            <path d="M8 15v-3M12 15V9M16 15V6" />
          </>
        )}
        {name === 'c-corp' && (
          <>
            <path d="M6 20V10l6-4 6 4v10" />
            <path d="M6 20h12" />
            <path d="M10 20v-4h4v4" />
            <path d="M9 12h6" />
          </>
        )}
        {name === 'construction' && (
          <>
            <path d="M4 20h16" />
            <path d="M7 20V11l5-4 5 4v9" />
            <path d="M10 14h4" />
          </>
        )}
        {name === 'it-tech' && (
          <>
            <rect x="3" y="5" width="18" height="12" rx="1.5" />
            <path d="M8 20h8" />
            <path d="M9 9h6M9 12h4" />
          </>
        )}
        {name === 'professional-services' && (
          <>
            <rect x="4" y="7" width="16" height="13" rx="1" />
            <path d="M9 7V6a3 3 0 0 1 6 0v1" />
            <path d="M12 12v3" />
          </>
        )}
        {name === 'manufacturing' && (
          <>
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </>
        )}
        {name === 'healthcare' && (
          <>
            <rect x="5" y="4" width="14" height="16" rx="2" />
            <path d="M12 8v8M9 11h6" />
          </>
        )}
        {name === 'transportation-logistics' && (
          <>
            <path d="M3 12h12l3-4H20l2 4h-1" />
            <circle cx="7" cy="17" r="2" />
            <circle cx="17" cy="17" r="2" />
          </>
        )}
        {name === 'facilities-maintenance' && (
          <>
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </>
        )}
        {name === 'education-training' && (
          <>
            <path d="M22 10v6M2 10l10-6 10 6-10 6z" />
            <path d="M6 12v5c0 1 2 3 6 3s6-2 6-3v-5" />
          </>
        )}
        {name === 'defense' && (
          <>
            <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z" />
          </>
        )}
        {name === 'other' && (
          <>
            <circle cx="8" cy="8" r="2" />
            <circle cx="16" cy="8" r="2" />
            <circle cx="8" cy="16" r="2" />
            <circle cx="16" cy="16" r="2" />
          </>
        )}
        {name === 'none' && (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 16v.01" />
            <path d="M12 12a1.5 1.5 0 1 0-1.5-2.5" />
          </>
        )}
        {name === 'veteran' && (
          <>
            <circle cx="12" cy="14" r="5" />
            <path d="M12 3v3M9.5 6.5L12 9l2.5-2.5M7 9l2 1.5M17 9l-2 1.5" />
          </>
        )}
        {name === 'woman-owned' && (
          <>
            <circle cx="12" cy="7" r="2.75" />
            <path d="M7 19v-1.25a5 5 0 0 1 10 0V19" />
            <path d="M12 11v2" />
          </>
        )}
        {name === 'minority-owned' && (
          <>
            <circle cx="9" cy="9" r="2.5" />
            <circle cx="15" cy="9" r="2.5" />
            <path d="M5 19v-1a4 4 0 0 1 4-3.5M15 14.5a4 4 0 0 1 4 3.5V19" />
          </>
        )}
        {name === 'native-american-owned' && (
          <>
            <path d="M12 3c-1.5 2-4 4-4 7a4 4 0 0 0 8 0c0-3-2.5-5-4-7z" />
            <path d="M8 21h8" />
          </>
        )}
        {name === 'economically-disadvantaged-woman' && (
          <>
            <circle cx="12" cy="7" r="2.75" />
            <path d="M7 19v-1.25a5 5 0 0 1 10 0V19" />
            <path d="M12 11v1.5M10 13h4" />
          </>
        )}
        {name === 'hubzone' && (
          <>
            <path d="M12 21s6-5.33 6-10a6 6 0 1 0-12 0c0 4.67 6 10 6 10z" />
            <circle cx="12" cy="11" r="2" />
          </>
        )}
        {name === 'multiple' && (
          <>
            <path d="M12 3l2.2 6.8H21l-5.5 4 2.1 6.7L12 16.5 6.4 20.5l2.1-6.7L3 9.8h6.8L12 3z" />
          </>
        )}
      </svg>
    </span>
  )
}
