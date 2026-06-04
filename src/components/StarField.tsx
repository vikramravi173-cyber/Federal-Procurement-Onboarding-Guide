import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  phase: number
  speed: number
  warm: boolean
}

interface StarFieldProps {
  className?: string
  /** Multiplier for star count (default 1) */
  density?: number
}

export function StarField({ className = '', density = 1 }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const frameRef = useRef(0)
  const sizeRef = useRef({ w: 0, h: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let running = true

    const initStars = (w: number, h: number) => {
      const count = Math.min(220, Math.max(90, Math.floor((w * h) / 9000) * density))
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.4 + Math.random() * 1.6,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.8,
        warm: Math.random() > 0.35,
      }))
    }

    const resize = () => {
      const parent = canvas.parentElement
      const w = parent?.clientWidth ?? window.innerWidth
      const h = parent?.clientHeight ?? window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      sizeRef.current = { w, h }
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      initStars(w, h)
    }

    const draw = (time: number) => {
      const { w, h } = sizeRef.current
      if (w === 0 || h === 0) return

      ctx.clearRect(0, 0, w, h)

      for (const s of starsRef.current) {
        const twinkle = reducedMotion
          ? 0.55
          : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(time * s.speed + s.phase))
        const alpha = twinkle * (s.warm ? 0.85 : 0.7)

        if (s.warm) {
          ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`
        }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()

        if (s.r > 1.2 && !reducedMotion && twinkle > 0.7) {
          ctx.fillStyle = s.warm
            ? `rgba(240, 215, 140, ${(twinkle - 0.7) * 0.5})`
            : `rgba(255, 255, 255, ${(twinkle - 0.7) * 0.35})`
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r * 2.2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const loop = (timestamp: number) => {
      if (!running) return
      draw(timestamp / 1000)
      frameRef.current = requestAnimationFrame(loop)
    }

    resize()

    const observer = new ResizeObserver(resize)
    if (canvas.parentElement) observer.observe(canvas.parentElement)

    if (!reducedMotion) {
      frameRef.current = requestAnimationFrame(loop)
    } else {
      draw(0)
    }

    return () => {
      running = false
      cancelAnimationFrame(frameRef.current)
      observer.disconnect()
    }
  }, [density])

  return <canvas ref={canvasRef} className={`star-field ${className}`.trim()} aria-hidden="true" />
}
