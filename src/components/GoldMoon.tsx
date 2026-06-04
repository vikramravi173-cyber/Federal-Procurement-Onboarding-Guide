import { useId } from 'react'

/** Harvest-moon style sphere with layered corona and realistic surface shading. */
export function GoldMoon() {
  const id = useId().replace(/:/g, '')

  return (
    <div className="gold-moon" aria-hidden="true">
      <div className="gold-moon__corona gold-moon__corona--outer" />
      <div className="gold-moon__corona gold-moon__corona--mid" />
      <div className="gold-moon__corona gold-moon__corona--inner" />
      <div className="gold-moon__atmosphere" />

      <svg className="gold-moon__sphere" viewBox="0 0 240 240" fill="none">
        <defs>
          <radialGradient id={`${id}-limb`} cx="34%" cy="30%" r="68%">
            <stop offset="0%" stopColor="#fff9eb" />
            <stop offset="28%" stopColor="#e8d9b8" />
            <stop offset="58%" stopColor="#b8a078" />
            <stop offset="82%" stopColor="#6e6454" />
            <stop offset="100%" stopColor="#2a2620" />
          </radialGradient>

          <radialGradient id={`${id}-shade`} cx="78%" cy="72%" r="52%">
            <stop offset="0%" stopColor="rgba(8, 6, 4, 0.72)" />
            <stop offset="45%" stopColor="rgba(12, 10, 8, 0.35)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </radialGradient>

          <radialGradient id={`${id}-rim`} cx="28%" cy="24%" r="72%">
            <stop offset="72%" stopColor="rgba(255, 248, 230, 0)" />
            <stop offset="88%" stopColor="rgba(255, 236, 190, 0.55)" />
            <stop offset="96%" stopColor="rgba(212, 175, 55, 0.35)" />
            <stop offset="100%" stopColor="rgba(255, 248, 230, 0)" />
          </radialGradient>

          <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0.85
                      0.85 0.7 0 0 0.65
                      0 0 0.4 0 0.2
                      0 0 0 0.45 0"
              result="goldBlur"
            />
            <feMerge>
              <feMergeNode in="goldBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={`${id}-grain`} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="3"
              seed="12"
              result="noise"
            />
            <feColorMatrix in="noise" type="saturate" values="0" result="grayNoise" />
            <feComponentTransfer in="grayNoise" result="softNoise">
              <feFuncA type="linear" slope="0.14" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="softNoise" mode="overlay" />
          </filter>

          <clipPath id={`${id}-disc`}>
            <circle cx="120" cy="120" r="96" />
          </clipPath>
        </defs>

        <g filter={`url(#${id}-glow)`}>
          <circle cx="120" cy="120" r="96" fill={`url(#${id}-limb)`} />
          <circle cx="120" cy="120" r="96" fill={`url(#${id}-shade)`} />
          <circle cx="120" cy="120" r="96" fill={`url(#${id}-rim)`} />

          <g clipPath={`url(#${id}-disc)`} opacity="0.42" filter={`url(#${id}-grain)`}>
            {/* Lunar maria — irregular, not cartoon circles */}
            <ellipse cx="98" cy="108" rx="38" ry="32" fill="#3d3528" />
            <ellipse cx="142" cy="95" rx="22" ry="18" fill="#352e24" />
            <ellipse cx="78" cy="82" rx="18" ry="14" fill="#2e2820" opacity="0.85" />
            <ellipse cx="128" cy="132" rx="28" ry="22" fill="#40382c" opacity="0.9" />
            <ellipse cx="155" cy="118" rx="14" ry="20" fill="#322c22" opacity="0.75" />
            <path
              d="M62 118 Q88 102 110 115 Q95 128 72 130 Z"
              fill="#383028"
              opacity="0.7"
            />
          </g>

          {/* Crater rims — subtle raised edges */}
          <g opacity="0.35" stroke="rgba(255, 248, 230, 0.25)" strokeWidth="0.6" fill="none">
            <circle cx="88" cy="74" r="11" />
            <circle cx="108" cy="98" r="7" />
            <circle cx="134" cy="78" r="5" />
            <circle cx="72" cy="108" r="4" />
            <ellipse cx="118" cy="128" rx="9" ry="7" />
          </g>
          <g opacity="0.2" fill="rgba(0, 0, 0, 0.25)">
            <circle cx="88" cy="74" r="9" />
            <circle cx="108" cy="98" r="5.5" />
            <circle cx="134" cy="78" r="3.5" />
          </g>
        </g>
      </svg>
    </div>
  )
}
