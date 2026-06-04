import { useId, useMemo } from 'react'
import { buildCoronaRays, buildRadialHatch } from './sunRays'

const INK = {
  deep: '#5c4818',
  mid: '#8a7020',
  body: '#b8962e',
  line: '#d4af37',
  bright: '#e8c86a',
  flare: '#fff4d0',
}

const CX = 250
const CY = 250

/** Vitruvian gold sun — radiant corona, manuscript ink, layered aura. */
export function GoldSun() {
  const id = useId().replace(/:/g, '')

  const coronaLong = useMemo(() => buildCoronaRays(CX, CY, 48, 118, 248, 0.1), [])
  const coronaMid = useMemo(() => buildCoronaRays(CX, CY, 32, 95, 185, 0.14), [])
  const radialHatch = useMemo(() => buildRadialHatch(CX, CY, 56, 28, 108), [])
  const radialCross = useMemo(() => buildRadialHatch(CX, CY, 28, 45, 102), [])

  return (
    <div className="gold-sun gold-sun--vitruvian" aria-hidden="true">
      <div className="gold-sun__aura gold-sun__aura--cosmic" />
      <div className="gold-sun__aura gold-sun__aura--outer" />
      <div className="gold-sun__aura gold-sun__aura--mid" />
      <div className="gold-sun__aura gold-sun__aura--core" />

      <svg className="gold-sun__art" viewBox="0 0 500 500" fill="none">
        <defs>
          <radialGradient id={`${id}-core`} cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor={INK.flare} />
            <stop offset="35%" stopColor={INK.bright} />
            <stop offset="72%" stopColor={INK.line} />
            <stop offset="100%" stopColor={INK.mid} />
          </radialGradient>

          <radialGradient id={`${id}-disc-shade`} cx="38%" cy="36%" r="62%">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="88%" stopColor="#000" stopOpacity="0.06" />
            <stop offset="100%" stopColor={INK.deep} stopOpacity="0.2" />
          </radialGradient>

          <filter id={`${id}-ray-glow`} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={`${id}-disc-glow`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0.95
                      0.85 0.75 0 0 0.75
                      0 0 0.35 0 0.25
                      0 0 0 0.55 0"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Vitruvian circle */}
        <circle
          cx={CX}
          cy={CY}
          r={228}
          stroke={INK.line}
          strokeWidth="0.75"
          fill="none"
          opacity="0.35"
          className="gold-sun__frame"
        />

        {/* Outer corona rays */}
        <g className="gold-sun__rays gold-sun__rays--far" filter={`url(#${id}-ray-glow)`}>
          {coronaLong.map((ray, i) => (
            <line
              key={`fl${i}`}
              x1={ray.x1}
              y1={ray.y1}
              x2={ray.x2}
              y2={ray.y2}
              stroke={INK.bright}
              strokeWidth={ray.width}
              strokeLinecap="round"
              opacity={0.22 + (i % 4) * 0.04}
            />
          ))}
        </g>

        {/* Mid corona */}
        <g className="gold-sun__rays gold-sun__rays--mid" filter={`url(#${id}-ray-glow)`}>
          {coronaMid.map((ray, i) => (
            <line
              key={`fm${i}`}
              x1={ray.x1}
              y1={ray.y1}
              x2={ray.x2}
              y2={ray.y2}
              stroke={INK.line}
              strokeWidth={ray.width + 0.2}
              strokeLinecap="round"
              opacity={0.45 + (i % 3) * 0.08}
            />
          ))}
        </g>

        {/* Solar disc */}
        <g filter={`url(#${id}-disc-glow)`}>
          <circle cx={CX} cy={CY} r={112} fill={`url(#${id}-core)`} />
          <circle cx={CX} cy={CY} r={112} fill={`url(#${id}-disc-shade)`} />

          <g stroke={INK.deep} strokeWidth="0.35" strokeLinecap="round" opacity="0.35">
            {radialHatch.map((l, i) => (
              <line key={`rh${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
            ))}
          </g>
          <g stroke={INK.body} strokeWidth="0.3" strokeLinecap="round" opacity="0.28">
            {radialCross.map((l, i) => (
              <line key={`rc${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
            ))}
          </g>

          {/* Leonardo-style study rings */}
          <circle cx={CX} cy={CY} r={72} stroke={INK.mid} strokeWidth="0.45" opacity="0.4" fill="none" />
          <circle cx={CX} cy={CY} r={48} stroke={INK.line} strokeWidth="0.4" opacity="0.35" fill="none" />
          <circle cx={CX} cy={CY} r={24} stroke={INK.bright} strokeWidth="0.35" opacity="0.45" fill="none" />

          {/* Faculae — bright ink spots */}
          <circle cx={228} cy={228} r={4} fill={INK.flare} opacity="0.5" />
          <circle cx={268} cy={242} r={3} fill={INK.bright} opacity="0.4" />
          <circle cx={248} cy={268} r={2.5} fill={INK.flare} opacity="0.45" />
          <ellipse cx={235} cy={255} rx={5} ry={3} fill={INK.flare} opacity="0.25" />
        </g>

        {/* Inner burst rays */}
        <g className="gold-sun__rays gold-sun__rays--inner" strokeLinecap="round">
          {buildCoronaRays(CX, CY, 16, 112, 138, 0).map((ray, i) => (
            <line
              key={`in${i}`}
              x1={ray.x1}
              y1={ray.y1}
              x2={ray.x2}
              y2={ray.y2}
              stroke={INK.flare}
              strokeWidth={1.2}
              opacity={0.65}
            />
          ))}
        </g>

        <circle
          cx={CX}
          cy={CY}
          r={112}
          stroke={INK.deep}
          strokeWidth="1"
          fill="none"
          opacity="0.75"
        />
      </svg>
    </div>
  )
}
