import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  twinklePhase: number
  twinkleSpeed: number
}

interface ParticleNetworkProps {
  className?: string
  /** Max distance (px) to draw connecting lines */
  linkDistance?: number
  /** Random fade in/out on each star */
  twinkle?: boolean
}

const GOLD = '212, 175, 55'

export function ParticleNetwork({ className = '', linkDistance = 130, twinkle = false }: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)
  const particlesRef = useRef<Particle[]>([])
  const sizeRef = useRef({ w: 0, h: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let running = true

    const initParticles = (w: number, h: number) => {
      const count = Math.min(95, Math.max(40, Math.floor((w * h) / 14000)))
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 0.8 + Math.random() * 1.1,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.6 + Math.random() * 1.4,
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

      if (particlesRef.current.length === 0) initParticles(w, h)
    }

    const draw = (animate: boolean, time = 0) => {
      const { w, h } = sizeRef.current
      if (w === 0 || h === 0) return

      const particles = particlesRef.current
      const useTwinkle = twinkle && !reducedMotion

      if (animate) {
        for (const p of particles) {
          p.x += p.vx
          p.y += p.vy
          if (p.x <= 0 || p.x >= w) {
            p.vx *= -1
            p.x = Math.max(0, Math.min(w, p.x))
          }
          if (p.y <= 0 || p.y >= h) {
            p.vy *= -1
            p.y = Math.max(0, Math.min(h, p.y))
          }
        }
      }

      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < linkDistance) {
            let alpha = (1 - dist / linkDistance) * 0.12
            if (useTwinkle) {
              const pulse =
                0.55 +
                0.45 *
                  Math.sin(
                    time * (particles[i].twinkleSpeed + particles[j].twinkleSpeed) * 0.5 +
                      particles[i].twinklePhase,
                  )
              alpha *= pulse
            }
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${GOLD}, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        let alpha = 0.35
        if (useTwinkle) {
          alpha = 0.12 + 0.38 * (0.5 + 0.5 * Math.sin(time * p.twinkleSpeed + p.twinklePhase))
        }
        ctx.beginPath()
        ctx.fillStyle = `rgba(${GOLD}, ${alpha})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = (timestamp: number) => {
      if (!running) return
      draw(true, timestamp / 1000)
      frameRef.current = requestAnimationFrame(loop)
    }

    resize()
    draw(false)

    const observer = new ResizeObserver(resize)
    if (canvas.parentElement) observer.observe(canvas.parentElement)

    if (!reducedMotion) {
      frameRef.current = requestAnimationFrame(loop)
    }

    return () => {
      running = false
      cancelAnimationFrame(frameRef.current)
      observer.disconnect()
    }
  }, [linkDistance, twinkle])

  return <canvas ref={canvasRef} className={`particle-network ${className}`.trim()} aria-hidden="true" />
}
