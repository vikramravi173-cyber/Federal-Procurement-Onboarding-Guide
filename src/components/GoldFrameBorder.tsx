import { useEffect, useState } from 'react'
import { DrawStrokePath } from './DrawStrokePath'

/** Asymmetric TL/BR corner frame with partial top/right edges (stroke-draw). */
const FRAME_STROKES = [
  { id: 'tl', d: 'M0 15 V0 H15', length: 30, delay: 0, duration: 0.45, thick: true },
  { id: 'left', d: 'M0 15 V100', length: 85, delay: 0.1, duration: 0.55, thick: false },
  { id: 'top', d: 'M15 0 H82', length: 67, delay: 0.2, duration: 0.42, thick: false },
  { id: 'br', d: 'M100 85 V100 H85', length: 30, delay: 0.32, duration: 0.45, thick: true },
  { id: 'bottom', d: 'M0 100 H85', length: 85, delay: 0.44, duration: 0.52, thick: false },
  { id: 'right', d: 'M100 85 V17', length: 68, delay: 0.54, duration: 0.42, thick: false },
] as const

interface GoldFrameBorderProps {
  /** When omitted, draws in on mount. */
  active?: boolean
  className?: string
}

export function GoldFrameBorder({ active: activeProp, className = '' }: GoldFrameBorderProps) {
  const [active, setActive] = useState(activeProp ?? false)

  useEffect(() => {
    if (activeProp !== undefined) {
      setActive(activeProp)
      return
    }
    const id = requestAnimationFrame(() => setActive(true))
    return () => cancelAnimationFrame(id)
  }, [activeProp])

  return (
    <svg
      className={`gold-frame-border ${className}`.trim()}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {FRAME_STROKES.map((stroke) => (
        <DrawStrokePath
          key={stroke.id}
          d={stroke.d}
          pathLength={stroke.length}
          active={active}
          duration={stroke.duration}
          delay={stroke.delay}
          className={
            stroke.thick ? 'gold-frame-border__thick' : 'gold-frame-border__thin'
          }
        />
      ))}
    </svg>
  )
}
