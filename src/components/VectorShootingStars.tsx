import { useEffect, useRef, useState, type CSSProperties } from 'react'

interface StarBurst {
  id: number
  x1: number
  y1: number
  x2: number
  y2: number
  pathLength: number
  duration: number
  delay: number
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function lineLength(x1: number, y1: number, x2: number, y2: number) {
  return Math.hypot(x2 - x1, y2 - y1)
}

interface VectorShootingStarsProps {
  maxActive?: number
  minInterval?: number
  maxInterval?: number
}

/** Shooting stars as SVG strokes with stroke-dashoffset draw streaks. */
export function VectorShootingStars({
  maxActive = 6,
  minInterval = 900,
  maxInterval = 2200,
}: VectorShootingStarsProps) {
  const [bursts, setBursts] = useState<StarBurst[]>([])
  const timersRef = useRef<number[]>([])
  const idRef = useRef(0)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const schedule = (fn: () => void, delay: number) => {
      const id = window.setTimeout(fn, delay)
      timersRef.current.push(id)
    }

    const spawn = () => {
      const id = ++idRef.current
      const x1 = randomBetween(2, 72)
      const y1 = randomBetween(4, 58)
      const angleDeg = randomBetween(-48, -22)
      const angle = (angleDeg * Math.PI) / 180
      const len = randomBetween(14, 28)
      const x2 = x1 + Math.cos(angle) * len
      const y2 = y1 + Math.sin(angle) * len
      const duration = randomBetween(0.55, 1.05)

      const burst: StarBurst = {
        id,
        x1,
        y1,
        x2,
        y2,
        pathLength: lineLength(x1, y1, x2, y2),
        duration,
        delay: 0,
      }

      setBursts((prev) => [...prev.slice(-(maxActive - 1)), burst])

      schedule(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id))
      }, duration * 1000 + 150)

      schedule(spawn, randomBetween(minInterval, maxInterval))
    }

    schedule(spawn, randomBetween(400, 900))
    schedule(spawn, randomBetween(1000, 1800))

    return () => {
      timersRef.current.forEach((t) => window.clearTimeout(t))
      timersRef.current = []
    }
  }, [maxActive, minInterval, maxInterval])

  return (
    <svg
      className="vector-shooting-stars"
      viewBox="0 0 100 70"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {bursts.map((burst) => (
        <line
          key={burst.id}
          x1={burst.x1}
          y1={burst.y1}
          x2={burst.x2}
          y2={burst.y2}
          className="vector-shooting-star"
          style={
            {
              '--star-len': burst.pathLength,
              '--star-dur': `${burst.duration}s`,
            } as CSSProperties
          }
        />
      ))}
    </svg>
  )
}
