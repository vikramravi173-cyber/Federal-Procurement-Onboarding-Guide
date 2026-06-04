import { useMemo } from 'react'

export interface DrawStrokePathProps {
  d: string
  pathLength: number
  active: boolean
  duration?: number
  delay?: number
  stroke?: string
  strokeWidth?: number
  className?: string
}

export function DrawStrokePath({
  d,
  pathLength,
  active,
  duration = 1,
  delay = 0,
  stroke,
  strokeWidth,
  className = '',
}: DrawStrokePathProps) {
  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  const showDrawn = active || reducedMotion

  return (
    <path
      d={d}
      className={`draw-stroke ${className}`.trim()}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        strokeDasharray: pathLength,
        strokeDashoffset: showDrawn ? 0 : pathLength,
        transition:
          reducedMotion || !active
            ? 'none'
            : `stroke-dashoffset ${duration}s ease ${delay}s`,
      }}
    />
  )
}
