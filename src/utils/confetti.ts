import confetti from 'canvas-confetti'

export function burstConfetti(intensity: 'subtle' | 'full' = 'subtle') {
  const count = intensity === 'full' ? 200 : 60
  const spread = intensity === 'full' ? 100 : 55
  const colors = ['#d4af37', '#f0d78c', '#ffffff', '#b8962e']

  confetti({
    particleCount: count,
    spread,
    origin: { y: intensity === 'full' ? 0.5 : 0.2 },
    colors,
    disableForReducedMotion: true,
  })

  if (intensity === 'full') {
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.6 },
        colors,
      })
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.6 },
        colors,
      })
    }, 200)
  }
}
