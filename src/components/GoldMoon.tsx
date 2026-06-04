import { useId, useMemo } from 'react'
import { buildCurvedHatch, buildParallelHatch } from './moonPencilHatch'
import { MOON_CRATERS, MOON_MARIA, MOON_VIEW, TYCHO } from './moonLunarMap'

/** Vitruvian manuscript gold ink on aged vellum. */
const INK = {
  deep: '#5c4818',
  mid: '#8a7020',
  body: '#b8962e',
  line: '#d4af37',
  bright: '#e8c86a',
  highlight: '#f5e6b8',
}

const PARCHMENT = '#dcc9a0'
const PARCHMENT_LIGHT = '#ebe0c4'

export function GoldMoon() {
  const id = useId().replace(/:/g, '')
  const { cx, cy, r } = MOON_VIEW

  const hatchLightA = useMemo(() => buildParallelHatch(cx, cy, r, 52, 6), [cx, cy, r])
  const hatchLightB = useMemo(() => buildParallelHatch(cx, cy, r, -38, 6), [cx, cy, r])
  const hatchMidA = useMemo(() => buildParallelHatch(cx, cy, r, 50, 4), [cx, cy, r])
  const hatchMidB = useMemo(() => buildParallelHatch(cx, cy, r, -40, 4), [cx, cy, r])
  const hatchDeepA = useMemo(() => buildParallelHatch(cx, cy, r, 48, 2.2), [cx, cy, r])
  const hatchDeepB = useMemo(() => buildParallelHatch(cx, cy, r, -42, 2.2), [cx, cy, r])
  const hatchMaria = useMemo(() => buildParallelHatch(cx, cy, r * 0.55, 52, 2), [cx, cy, r])
  const hatchMariaCross = useMemo(() => buildParallelHatch(cx, cy, r * 0.55, -40, 2), [cx, cy, r])
  const curvedBands = useMemo(() => buildCurvedHatch(cx, cy, r, 18), [cx, cy, r])

  const tychoRays = useMemo(() => {
    const rays: { x1: number; y1: number; x2: number; y2: number }[] = []
    for (let deg = 0; deg < 360; deg += 8) {
      const rad = (deg * Math.PI) / 180
      const len = 55 + (deg % 3) * 18
      rays.push({
        x1: TYCHO.cx + Math.cos(rad) * 8,
        y1: TYCHO.cy + Math.sin(rad) * 8,
        x2: TYCHO.cx + Math.cos(rad) * len,
        y2: TYCHO.cy + Math.sin(rad) * len,
      })
    }
    return rays
  }, [])

  return (
    <div className="gold-moon gold-moon--vitruvian" aria-hidden="true">
      <div className="gold-moon__corona gold-moon__corona--outer" />
      <div className="gold-moon__corona gold-moon__corona--mid" />

      <svg className="gold-moon__sphere" viewBox="0 0 500 500" fill="none">
        <defs>
          <clipPath id={`${id}-disc`}>
            <circle cx={cx} cy={cy} r={r} />
          </clipPath>

          <radialGradient id={`${id}-parchment`} cx="42%" cy="38%" r="68%">
            <stop offset="0%" stopColor={PARCHMENT_LIGHT} />
            <stop offset="55%" stopColor={PARCHMENT} />
            <stop offset="100%" stopColor="#c4ad82" />
          </radialGradient>

          <radialGradient id={`${id}-shade-mask`} cx="28%" cy="70%" r="58%">
            <stop offset="0%" stopColor="white" />
            <stop offset="50%" stopColor="white" stopOpacity="0.35" />
            <stop offset="100%" stopColor="black" />
          </radialGradient>

          <mask id={`${id}-shade`}>
            <rect width="500" height="500" fill="black" />
            <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-shade-mask)`} />
          </mask>

          <radialGradient id={`${id}-sfumato`} cx="50%" cy="50%" r="50%">
            <stop offset="82%" stopColor={INK.deep} stopOpacity="0" />
            <stop offset="94%" stopColor={INK.deep} stopOpacity="0.08" />
            <stop offset="100%" stopColor={INK.deep} stopOpacity="0.18" />
          </radialGradient>

          <filter id={`${id}-vellum`} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed="4" result="n" />
            <feColorMatrix in="n" type="saturate" values="0" result="g" />
            <feComponentTransfer in="g" result="t">
              <feFuncA type="linear" slope="0.07" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="t" mode="multiply" />
          </filter>
        </defs>

        {/* Vitruvian circle — manuscript frame */}
        <circle
          cx={cx}
          cy={cy}
          r={r + 6}
          stroke={INK.line}
          strokeWidth="0.85"
          fill="none"
          opacity="0.4"
        />

        <g clipPath={`url(#${id}-disc)`} filter={`url(#${id}-vellum)`}>
          <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-parchment)`} />

          {/* Age spots on vellum */}
          <ellipse cx="180" cy="160" rx="28" ry="18" fill="#b8a078" opacity="0.12" />
          <ellipse cx="320" cy="280" rx="22" ry="14" fill="#a89068" opacity="0.1" />
          <ellipse cx="140" cy="300" rx="16" ry="20" fill="#c4ad82" opacity="0.08" />

          {/* Light cross-hatch — gold ink */}
          <g stroke={INK.bright} strokeWidth="0.28" opacity="0.28" strokeLinecap="round">
            {hatchLightA.map((l, i) => (
              <line key={`la${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
            ))}
          </g>
          <g stroke={INK.line} strokeWidth="0.26" opacity="0.2" strokeLinecap="round">
            {hatchLightB.map((l, i) => (
              <line key={`lb${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
            ))}
          </g>

          <g stroke={INK.body} strokeWidth="0.32" opacity="0.22" strokeLinecap="round">
            {hatchMidA.map((l, i) => (
              <line key={`ma${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
            ))}
          </g>
          <g stroke={INK.mid} strokeWidth="0.3" opacity="0.18" strokeLinecap="round">
            {hatchMidB.map((l, i) => (
              <line key={`mb${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
            ))}
          </g>

          {/* Form studies — latitude curves */}
          <g stroke={INK.line} strokeWidth="0.35" fill="none" opacity="0.22" strokeLinecap="round">
            {curvedBands.map((d, i) => (
              <path key={`cv${i}`} d={d} />
            ))}
          </g>

          {/* Shadow hemisphere — dense gold cross-hatch */}
          <g mask={`url(#${id}-shade)`}>
            <g stroke={INK.mid} strokeWidth="0.38" strokeLinecap="round" opacity="0.55">
              {hatchDeepA.map((l, i) => (
                <line key={`da${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
              ))}
            </g>
            <g stroke={INK.deep} strokeWidth="0.34" strokeLinecap="round" opacity="0.48">
              {hatchDeepB.map((l, i) => (
                <line key={`db${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
              ))}
            </g>
          </g>

          {/* Maria outlines */}
          <g
            stroke={INK.deep}
            strokeWidth="0.65"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity="0.85"
          >
            {MOON_MARIA.map((d, i) => (
              <path key={`mare${i}`} d={d} />
            ))}
          </g>

          {/* Maria interior — heavy gold hatch */}
          <g clipPath={`url(#${id}-disc)`} opacity="0.65">
            <g stroke={INK.body} strokeWidth="0.22" strokeLinecap="round">
              {hatchMaria.map((l, i) => (
                <line key={`hm${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
              ))}
              {hatchMariaCross.map((l, i) => (
                <line key={`hmc${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
              ))}
            </g>
          </g>

          {/* Tycho ray system */}
          <g stroke={INK.bright} strokeWidth="0.28" opacity="0.35" strokeLinecap="round">
            {tychoRays.map((ray, i) => (
              <line key={`ty${i}`} x1={ray.x1} y1={ray.y1} x2={ray.x2} y2={ray.y2} />
            ))}
          </g>

          {/* Craters — detailed ink ellipses */}
          <g stroke={INK.deep} fill="none" strokeLinecap="round" opacity="0.8">
            {MOON_CRATERS.map((c, i) => {
              const ry = c.ry ?? c.rx * 0.92
              const w = 0.55 + (c.detail ?? 1) * 0.12
              return (
                <g key={`cr${i}`}>
                  <ellipse cx={c.cx} cy={c.cy} rx={c.rx} ry={ry} strokeWidth={w} stroke={INK.deep} />
                  <path
                    d={`M${c.cx} ${c.cy} A${c.rx} ${ry} 0 0 1 ${c.cx + c.rx * 0.55} ${c.cy + ry * 0.45}`}
                    stroke={INK.mid}
                    strokeWidth={w * 0.65}
                    opacity="0.5"
                  />
                  {(c.detail ?? 1) >= 2 && (
                    <>
                      <path
                        d={`M${c.cx - c.rx * 0.3} ${c.cy - ry * 0.2} Q${c.cx} ${c.cy + ry * 0.15} ${c.cx + c.rx * 0.25} ${c.cy - ry * 0.15}`}
                        stroke={INK.body}
                        strokeWidth={0.35}
                        opacity="0.4"
                      />
                      <line
                        x1={c.cx - c.rx * 0.35}
                        y1={c.cy - ry * 0.35}
                        x2={c.cx - c.rx * 0.15}
                        y2={c.cy - ry * 0.15}
                        stroke={INK.line}
                        strokeWidth={0.28}
                        opacity="0.35"
                      />
                    </>
                  )}
                  {(c.detail ?? 1) >= 3 && (
                    <g opacity="0.45">
                      {buildParallelHatch(c.cx, c.cy, c.rx * 0.85, 52, 2.5)
                        .slice(0, 12)
                        .map((l, j) => (
                          <line
                            key={`chi${i}-${j}`}
                            x1={l.x1}
                            y1={l.y1}
                            x2={l.x2}
                            y2={l.y2}
                            stroke={INK.mid}
                            strokeWidth={0.22}
                          />
                        ))}
                    </g>
                  )}
                </g>
              )
            })}
          </g>

          <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-sfumato)`} />
        </g>

        {/* Master contour — gold ink */}
        <path
          d={`M ${cx - 2} ${cy - r + 4}
             C ${cx + 55} ${cy - r}, ${cx + 115} ${cy - r + 35}, ${cx + 155} ${cy - r + 85}
             C ${cx + 185} ${cy - 35}, ${cx + 178} ${cy + 45}, ${cx + 155} ${cy + r - 35}
             C ${cx + 115} ${cy + r + 8}, ${cx + 45} ${cy + r + 5}, ${cx - 25} ${cy + r - 15}
             C ${cx - 75} ${cy + r - 55}, ${cx - 95} ${cy + 35}, ${cx - 85} ${cy - 25}
             C ${cx - 70} ${cy - 85}, ${cx - 25} ${cy - r + 25}, ${cx - 2} ${cy - r + 4} Z`}
          stroke={INK.deep}
          strokeWidth="1.15"
          fill="none"
          strokeLinejoin="round"
          opacity="0.92"
        />
      </svg>
    </div>
  )
}
