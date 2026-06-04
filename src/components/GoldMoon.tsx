import { useId } from 'react'

/** Vintage engraved full moon — stippling, maria, and cross-hatched craters. */
export function GoldMoon() {
  const id = useId().replace(/:/g, '')

  return (
    <div className="gold-moon" aria-hidden="true">
      <div className="gold-moon__corona gold-moon__corona--outer" />
      <div className="gold-moon__corona gold-moon__corona--mid" />
      <div className="gold-moon__corona gold-moon__corona--inner" />

      <svg className="gold-moon__sphere" viewBox="0 0 400 400" fill="none">
        <defs>
          <pattern
            id={`${id}-stipple`}
            width="5"
            height="5"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2.5" cy="2.5" r="0.85" fill="#4a4338" opacity="0.55" />
          </pattern>

          <pattern
            id={`${id}-stipple-fine`}
            width="3"
            height="3"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="0.45" fill="#5c5346" opacity="0.4" />
          </pattern>

          <clipPath id={`${id}-disc`}>
            <circle cx="200" cy="200" r="168" />
          </clipPath>

          <radialGradient id={`${id}-limb-glow`} cx="72%" cy="38%" r="55%">
            <stop offset="0%" stopColor="rgba(255, 252, 245, 0.15)" />
            <stop offset="100%" stopColor="rgba(255, 252, 245, 0)" />
          </radialGradient>

          <filter id={`${id}-moonlight`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0.92
                      0.88 0.82 0 0 0.88
                      0 0 0.55 0 0.35
                      0 0 0 0.35 0"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter={`url(#${id}-moonlight)`} clipPath={`url(#${id}-disc)`}>
          {/* Parchment highlands */}
          <circle cx="200" cy="200" r="168" fill="#e8dcc8" />
          <circle cx="200" cy="200" r="168" fill={`url(#${id}-stipple)`} />
          <circle cx="200" cy="200" r="168" fill={`url(#${id}-stipple-fine)`} opacity="0.65" />
          <circle cx="200" cy="200" r="168" fill={`url(#${id}-limb-glow)`} />

          {/* Lunar maria — solid ink, left & center (light from right) */}
          <g fill="#0a0908">
            <path d="M52 118 C68 72 118 52 158 68 C148 98 108 128 72 142 C48 138 38 128 52 118Z" />
            <path d="M44 168 C78 148 128 158 138 198 C118 228 68 222 42 192 C34 182 38 172 44 168Z" />
            <path d="M98 88 C118 68 148 72 162 92 C152 112 118 118 92 102 C86 96 90 90 98 88Z" />
            <path d="M128 148 C158 132 188 148 182 178 C162 198 128 192 118 168 C116 158 122 152 128 148Z" />
            <path d="M72 198 C98 188 118 208 108 232 C82 242 58 228 62 208 C64 202 68 200 72 198Z" />
            <ellipse cx="118" cy="248" rx="32" ry="22" />
          </g>

          {/* Cross-hatching in bright highlands (right side) */}
          <g
            clipPath={`url(#${id}-disc)`}
            stroke="#6b6254"
            strokeWidth="0.7"
            opacity="0.35"
            strokeLinecap="round"
          >
            <line x1="220" y1="95" x2="248" y2="118" />
            <line x1="228" y1="88" x2="256" y2="111" />
            <line x1="252" y1="132" x2="278" y2="155" />
            <line x1="244" y1="124" x2="270" y2="147" />
            <line x1="268" y1="168" x2="292" y2="188" />
            <line x1="260" y1="160" x2="284" y2="180" />
            <line x1="238" y1="198" x2="262" y2="218" />
            <line x1="248" y1="228" x2="272" y2="248" />
            <line x1="210" y1="248" x2="234" y2="268" />
          </g>

          {/* Crater rims & interior hatching */}
          <g
            stroke="#2a2620"
            strokeWidth="1.1"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          >
            <circle cx="248" cy="108" r="22" />
            <path d="M248 108 A22 22 0 0 1 262 125" strokeWidth="0.8" opacity="0.5" />
            <line x1="242" y1="102" x2="252" y2="112" strokeWidth="0.6" opacity="0.4" />
            <line x1="245" y1="99" x2="255" y2="109" strokeWidth="0.6" opacity="0.4" />

            <circle cx="278" cy="142" r="14" />
            <path d="M278 142 A14 14 0 0 1 288 154" strokeWidth="0.7" opacity="0.45" />
            <line x1="274" y1="138" x2="282" y2="146" strokeWidth="0.55" opacity="0.35" />

            <circle cx="262" cy="178" r="18" />
            <path d="M262 178 A18 18 0 0 1 276 194" strokeWidth="0.75" opacity="0.45" />
            <line x1="256" y1="172" x2="266" y2="182" strokeWidth="0.55" opacity="0.35" />
            <line x1="259" y1="169" x2="269" y2="179" strokeWidth="0.55" opacity="0.35" />

            <circle cx="292" cy="198" r="9" />
            <circle cx="228" cy="162" r="11" />
            <circle cx="302" cy="228" r="12" />
            <circle cx="268" cy="248" r="8" />
            <circle cx="238" cy="218" r="6" />
            <circle cx="318" cy="168" r="5" />
            <circle cx="212" cy="128" r="7" />
            <circle cx="285" cy="268" r="6" />
          </g>

          {/* Inner crater shadow fills */}
          <g fill="#0a0908" opacity="0.25">
            <path d="M248 108 A22 22 0 0 1 262 125 L248 108Z" />
            <path d="M278 142 A14 14 0 0 1 288 154 L278 142Z" />
            <path d="M262 178 A18 18 0 0 1 276 194 L262 178Z" />
          </g>
        </g>

        {/* Hand-drawn outer rim */}
        <circle
          cx="200"
          cy="200"
          r="168"
          stroke="#1a1814"
          strokeWidth="2.2"
          fill="none"
          opacity="0.9"
          strokeLinejoin="round"
        />
        <circle
          cx="200"
          cy="200"
          r="166"
          stroke="#f5ecd8"
          strokeWidth="0.6"
          fill="none"
          opacity="0.35"
        />
      </svg>
    </div>
  )
}
