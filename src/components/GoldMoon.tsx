import { useId, useMemo } from 'react'
import { buildCurvedHatch, buildParallelHatch } from './moonPencilHatch'

const GRAPHITE = '#3a3630'
const GRAPHITE_LIGHT = '#5c564c'
const GRAPHITE_SOFT = '#8a8278'
const PAPER = '#f2ebe2'

/** Da Vinci–style pencil moon: cross-hatching, sfumato tone, precise contour. */
export function GoldMoon() {
  const id = useId().replace(/:/g, '')

  const hatchFine = useMemo(() => buildParallelHatch(200, 200, 172, 52, 7), [])
  const hatchCross = useMemo(() => buildParallelHatch(200, 200, 172, -38, 7), [])
  const hatchShadowA = useMemo(() => buildParallelHatch(200, 200, 172, 48, 3), [])
  const hatchShadowB = useMemo(() => buildParallelHatch(200, 200, 172, -42, 3), [])
  const hatchMariaA = useMemo(() => buildParallelHatch(100, 130, 80, 52, 2.6), [])
  const hatchMariaB = useMemo(() => buildParallelHatch(100, 130, 80, -40, 2.6), [])
  const curvedBands = useMemo(() => buildCurvedHatch(200, 200, 168, 14), [])

  return (
    <div className="gold-moon gold-moon--pencil" aria-hidden="true">
      <div className="gold-moon__corona gold-moon__corona--outer" />
      <div className="gold-moon__corona gold-moon__corona--mid" />

      <svg className="gold-moon__sphere" viewBox="0 0 400 400" fill="none">
        <defs>
          <clipPath id={`${id}-disc`}>
            <circle cx="200" cy="200" r="168" />
          </clipPath>

          <radialGradient id={`${id}-shade-mask`} cx="30%" cy="68%" r="58%">
            <stop offset="0%" stopColor="white" />
            <stop offset="55%" stopColor="white" stopOpacity="0.45" />
            <stop offset="100%" stopColor="black" />
          </radialGradient>

          <mask id={`${id}-shade`}>
            <rect width="400" height="400" fill="black" />
            <circle cx="200" cy="200" r="168" fill={`url(#${id}-shade-mask)`} />
          </mask>

          <radialGradient id={`${id}-sfumato`} cx="50%" cy="50%" r="50%">
            <stop offset="80%" stopColor="#000" stopOpacity="0" />
            <stop offset="94%" stopColor="#000" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.22" />
          </radialGradient>

          <filter id={`${id}-paper`} x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="2"
              seed="8"
              result="grain"
            />
            <feColorMatrix in="grain" type="saturate" values="0" result="gray" />
            <feComponentTransfer in="gray" result="soft">
              <feFuncA type="linear" slope="0.05" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="soft" mode="multiply" />
          </filter>
        </defs>

        <g clipPath={`url(#${id}-disc)`} filter="url(#${id}-paper)">
          <circle cx="200" cy="200" r="168" fill={PAPER} />

          <g stroke={GRAPHITE_SOFT} strokeWidth="0.35" opacity="0.2" strokeLinecap="round">
            {hatchFine.map((l, i) => (
              <line key={`f${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
            ))}
          </g>
          <g stroke={GRAPHITE_SOFT} strokeWidth="0.32" opacity="0.14" strokeLinecap="round">
            {hatchCross.map((l, i) => (
              <line key={`c${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
            ))}
          </g>

          <g
            stroke={GRAPHITE_LIGHT}
            strokeWidth="0.38"
            fill="none"
            opacity="0.18"
            strokeLinecap="round"
          >
            {curvedBands.map((d, i) => (
              <path key={`b${i}`} d={d} />
            ))}
          </g>

          <g mask={`url(#${id}-shade)`}>
            <g stroke={GRAPHITE} strokeWidth="0.4" strokeLinecap="round" opacity="0.5">
              {hatchShadowA.map((l, i) => (
                <line key={`sa${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
              ))}
            </g>
            <g stroke={GRAPHITE} strokeWidth="0.36" strokeLinecap="round" opacity="0.42">
              {hatchShadowB.map((l, i) => (
                <line key={`sb${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
              ))}
            </g>
          </g>

          <g
            stroke={GRAPHITE}
            strokeWidth="0.6"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity="0.7"
          >
            <path d="M48 125 C62 78 115 58 155 72 C142 108 98 138 58 148 C42 142 38 132 48 125Z" />
            <path d="M38 178 C72 158 122 168 132 205 C108 238 58 232 36 198 C30 186 34 176 38 178Z" />
            <path d="M92 82 C112 62 142 66 158 88 C148 108 112 114 88 98 C82 90 86 84 92 82Z" />
            <path d="M122 142 C152 126 182 142 176 172 C156 192 122 186 112 162 C110 152 116 146 122 142Z" />
            <path d="M68 202 C94 192 114 212 104 236 C78 246 54 232 58 210 C60 204 64 202 68 202Z" />
          </g>

          <g clipPath={`url(#${id}-disc)`} opacity="0.55">
            <g stroke={GRAPHITE} strokeWidth="0.28" strokeLinecap="round">
              {hatchMariaA.map((l, i) => (
                <line key={`m1${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
              ))}
              {hatchMariaB.map((l, i) => (
                <line key={`m2${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
              ))}
            </g>
          </g>

          <g stroke={GRAPHITE_LIGHT} strokeWidth="0.32" opacity="0.22" strokeLinecap="round">
            {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((deg) => {
              const r = (deg * Math.PI) / 180
              const x0 = 248 + Math.cos(r) * 6
              const y0 = 268 + Math.sin(r) * 6
              const x1 = 248 + Math.cos(r) * 52
              const y1 = 268 + Math.sin(r) * 52
              return <line key={deg} x1={x0} y1={y0} x2={x1} y2={y1} />
            })}
          </g>

          <g
            stroke={GRAPHITE}
            strokeWidth="0.7"
            fill="none"
            strokeLinecap="round"
            opacity="0.72"
          >
            <ellipse cx="252" cy="102" rx="24" ry="22" />
            <path d="M252 102 A24 22 0 0 1 268 118" strokeWidth="0.48" opacity="0.4" />
            <path d="M244 96 Q252 108 260 100" strokeWidth="0.42" opacity="0.32" />
            <ellipse cx="282" cy="138" rx="15" ry="14" />
            <path d="M282 138 A15 14 0 0 1 294 150" strokeWidth="0.42" opacity="0.38" />
            <ellipse cx="264" cy="174" rx="19" ry="17" />
            <path d="M264 174 A19 17 0 0 1 280 190" strokeWidth="0.48" opacity="0.38" />
            <ellipse cx="298" cy="192" rx="10" ry="9" />
            <ellipse cx="224" cy="158" rx="12" ry="11" />
            <ellipse cx="308" cy="222" rx="13" ry="12" />
            <ellipse cx="272" cy="242" rx="9" ry="8" />
            <ellipse cx="238" cy="212" rx="7" ry="6" />
            <ellipse cx="208" cy="122" rx="8" ry="7" />
          </g>

          <circle cx="200" cy="200" r="168" fill={`url(#${id}-sfumato)`} />
        </g>

        <path
          d="M 198 34
             C 248 32, 312 58, 348 108
             C 372 158, 368 228, 332 278
             C 292 328, 228 352, 162 342
             C 98 328, 48 278, 38 218
             C 28 158, 58 98, 118 58
             C 148 40, 172 34, 198 34 Z"
          stroke={GRAPHITE}
          strokeWidth="1.3"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>
    </div>
  )
}
