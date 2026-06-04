import { useEffect, useRef, useState } from 'react'

interface StarBurst {
  id: number
  top: number
  left: number
  angle: number
  duration: number
  length: number
  thickness: number
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

interface ShootingStarsProps {
  /** How many streaks can appear at once */
  maxActive?: number
  /** Min ms between spawns */
  minInterval?: number
  /** Max ms between spawns */
  maxInterval?: number
}

/** Shooting stars across the space backdrop. */
export function ShootingStars({
  maxActive = 6,
  minInterval = 900,
  maxInterval = 2200,
}: ShootingStarsProps) {
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
      const burst: StarBurst = {
        id,
        top: randomBetween(4, 72),
        left: randomBetween(-8, 68),
        angle: randomBetween(-48, -22),
        duration: randomBetween(0.55, 1.05),
        length: randomBetween(100, 180),
        thickness: randomBetween(1, 2.5),
      }

      setBursts((prev) => [...prev.slice(-(maxActive - 1)), burst])

      schedule(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id))
      }, burst.duration * 1000 + 120)

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
    <div className="shooting-stars" aria-hidden="true">
      {bursts.map((burst) => (
        <span
          key={burst.id}
          className="shooting-star"
          style={{
            top: `${burst.top}%`,
            left: `${burst.left}%`,
            width: `${burst.length}px`,
            height: `${burst.thickness}px`,
            ['--shoot-angle' as string]: `${burst.angle}deg`,
            ['--shoot-duration' as string]: `${burst.duration}s`,
            ['--shoot-travel' as string]: `${burst.length + 80}px`,
          }}
        />
      ))}
    </div>
  )
}
