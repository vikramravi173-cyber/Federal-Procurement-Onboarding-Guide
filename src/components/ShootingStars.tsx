import { useEffect, useRef, useState } from 'react'

interface StarBurst {
  id: number
  top: number
  left: number
  angle: number
  duration: number
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

/** Occasional shooting stars across the space backdrop. */
export function ShootingStars() {
  const [bursts, setBursts] = useState<StarBurst[]>([])
  const timeoutRef = useRef(0)
  const idRef = useRef(0)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const spawn = () => {
      const id = ++idRef.current
      const burst: StarBurst = {
        id,
        top: randomBetween(8, 55),
        left: randomBetween(-5, 55),
        angle: randomBetween(-42, -28),
        duration: randomBetween(0.65, 0.95),
      }

      setBursts((prev) => [...prev.slice(-2), burst])

      window.setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id))
      }, burst.duration * 1000 + 100)

      timeoutRef.current = window.setTimeout(spawn, randomBetween(4000, 8000))
    }

    timeoutRef.current = window.setTimeout(spawn, randomBetween(1500, 3500))

    return () => window.clearTimeout(timeoutRef.current)
  }, [])

  return (
    <div className="shooting-stars" aria-hidden="true">
      {bursts.map((burst) => (
        <span
          key={burst.id}
          className="shooting-star"
          style={{
            top: `${burst.top}%`,
            left: `${burst.left}%`,
            ['--shoot-angle' as string]: `${burst.angle}deg`,
            ['--shoot-duration' as string]: `${burst.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
