import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'

interface StarBurst {
  id: number
  x1: number
  y1: number
  x2: number
  y2: number
  pathLength: number
  headLen: number
  duration: number
  strokeWidth: number
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function lineLength(x1: number, y1: number, x2: number, y2: number) {
  return Math.hypot(x2 - x1, y2 - y1)
}

interface VectorShootingStarsProps {
  /** Max streaks visible at once */
  maxActive?: number
  /** Min ms between spawns */
  minInterval?: number
  /** Max ms between spawns */
  maxInterval?: number
}

/** Occasional background meteors — thin gradient streaks sweeping across the sky. */
export function VectorShootingStars({
  maxActive = 2,
  minInterval = 4500,
  maxInterval = 11000,
}: VectorShootingStarsProps) {
  const baseId = useId().replace(/:/g, '')
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
      const x1 = randomBetween(0, 78)
      const y1 = randomBetween(2, 42)
      const angleDeg = randomBetween(-40, -26)
      const angle = (angleDeg * Math.PI) / 180
      const streakLen = randomBetween(28, 52)
      const x2 = x1 + Math.cos(angle) * streakLen
      const y2 = y1 + Math.sin(angle) * streakLen
      const pathLength = lineLength(x1, y1, x2, y2)
      const headLen = randomBetween(4, 9)
      const duration = randomBetween(1.1, 1.85)

      const burst: StarBurst = {
        id,
        x1,
        y1,
        x2,
        y2,
        pathLength,
        headLen,
        duration,
        strokeWidth: randomBetween(0.28, 0.55),
      }

      setBursts((prev) => [...prev.slice(-(maxActive - 1)), burst])

      schedule(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id))
      }, duration * 1000 + 200)

      schedule(spawn, randomBetween(minInterval, maxInterval))
    }

    schedule(spawn, randomBetween(2800, 6500))

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
      <defs>
        {bursts.map((burst) => (
          <linearGradient
            key={`grad-${burst.id}`}
            id={`${baseId}-meteor-${burst.id}`}
            gradientUnits="userSpaceOnUse"
            x1={burst.x1}
            y1={burst.y1}
            x2={burst.x2}
            y2={burst.y2}
          >
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="55%" stopColor="rgba(212, 175, 55, 0.12)" />
            <stop offset="82%" stopColor="rgba(240, 215, 140, 0.55)" />
            <stop offset="100%" stopColor="rgba(255, 252, 235, 0.92)" />
          </linearGradient>
        ))}
      </defs>
      {bursts.map((burst) => (
        <line
          key={burst.id}
          x1={burst.x1}
          y1={burst.y1}
          x2={burst.x2}
          y2={burst.y2}
          className="vector-shooting-star"
          stroke={`url(#${baseId}-meteor-${burst.id})`}
          style={
            {
              '--star-len': burst.pathLength,
              '--head-len': burst.headLen,
              '--star-width': burst.strokeWidth,
              '--star-dur': `${burst.duration}s`,
            } as CSSProperties
          }
        />
      ))}
    </svg>
  )
}
