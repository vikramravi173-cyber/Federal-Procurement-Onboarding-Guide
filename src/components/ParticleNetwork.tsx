import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

interface ParticleNetworkProps {
  className?: string
  /** Max distance (px) to draw connecting lines */
  linkDistance?: number
}

const GOLD = '212, 175, 55'

export function ParticleNetwork({ className = '', linkDistance = 130 }: ParticleNetworkProps) {
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
      const count = Math.min(65, Math.max(28, Math.floor((w * h) / 20000)))
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 1 + Math.random() * 0.6,
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

    const draw = (animate: boolean) => {
      const { w, h } = sizeRef.current
      if (w === 0 || h === 0) return

      const particles = particlesRef.current

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
            const alpha = (1 - dist / linkDistance) * 0.12
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
        ctx.beginPath()
        ctx.fillStyle = `rgba(${GOLD}, 0.35)`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = () => {
      if (!running) return
      draw(true)
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
  }, [linkDistance])

  return <canvas ref={canvasRef} className={`particle-network ${className}`.trim()} aria-hidden="true" />
}
