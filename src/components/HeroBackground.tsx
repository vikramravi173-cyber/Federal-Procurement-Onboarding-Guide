import { ParticleNetwork } from './ParticleNetwork'

/** Dark hero backdrop with subtle animated gold particle constellation. */
export function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-bg-base" />
      <ParticleNetwork className="hero-particles" />
      <div className="hero-bg-vignette" />
    </div>
  )
}
