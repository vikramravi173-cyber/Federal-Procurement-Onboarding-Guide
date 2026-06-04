import { DrawStrokePath } from './DrawStrokePath'

const BRACKET_LEN = 22

const CORNERS = [
  { id: 'tl', d: 'M2 20 V2 H20', delay: 0 },
  { id: 'tr', d: 'M78 2 H98 V20', delay: 0.06 },
  { id: 'br', d: 'M98 80 V98 H80', delay: 0.12 },
  { id: 'bl', d: 'M20 98 H2 V80', delay: 0.18 },
] as const

interface StepCardCornersProps {
  inView: boolean
}

/** Gold corner brackets that draw in when the card enters the viewport. */
export function StepCardCorners({ inView }: StepCardCornersProps) {
  return (
    <svg
      className="step-card-corners"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {CORNERS.map((corner) => (
        <DrawStrokePath
          key={corner.id}
          d={corner.d}
          pathLength={BRACKET_LEN}
          active={inView}
          duration={0.5}
          delay={corner.delay}
        />
      ))}
    </svg>
  )
}
