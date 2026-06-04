import { useEffect, useState } from 'react'
import { CAPITOL_STROKES } from '../data/capitolPaths'
import { DrawStrokePath } from './DrawStrokePath'

/** U.S. Capitol line art that draws itself on load (stroke-dashoffset). */
export function CapitolDrawing() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setActive(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <svg
      className="capitol-drawing"
      viewBox="0 0 480 260"
      fill="none"
      aria-hidden="true"
    >
      {CAPITOL_STROKES.map((stroke) => (
        <DrawStrokePath
          key={stroke.id}
          d={stroke.d}
          pathLength={stroke.length}
          active={active}
          duration={stroke.duration}
          delay={stroke.delay}
        />
      ))}
    </svg>
  )
}
