import { ParticleNetwork } from './ParticleNetwork'
import { ShootingStars } from './ShootingStars'

/** Intake backdrop: constellation, nebula glow, twinkling stars, and shooting stars. */
export function IntakeSpaceBackground() {
  return (
    <div className="hero-bg intake-space-theme" aria-hidden="true">
      <div className="hero-bg-base" />
      <div className="space-nebula">
        <div className="space-nebula__blob space-nebula__blob--1" />
        <div className="space-nebula__blob space-nebula__blob--2" />
        <div className="space-nebula__blob space-nebula__blob--3" />
      </div>
      <ParticleNetwork className="hero-particles" twinkle />
      <ShootingStars />
      <div className="hero-bg-vignette" />
    </div>
  )
}
