import { GoldSun } from './GoldSun'
import { ParticleNetwork } from './ParticleNetwork'
import { ShootingStars } from './ShootingStars'
import { StarField } from './StarField'

/** Intake backdrop: nebula, stars, gold sun, constellation, and shooting stars. */
export function IntakeSpaceBackground() {
  return (
    <div className="hero-bg intake-space-theme" aria-hidden="true">
      <div className="hero-bg-base" />
      <div className="space-nebula">
        <div className="space-nebula__blob space-nebula__blob--1" />
        <div className="space-nebula__blob space-nebula__blob--2" />
        <div className="space-nebula__blob space-nebula__blob--3" />
      </div>
      <GoldSun />
      <StarField className="hero-star-field" density={1.25} />
      <ParticleNetwork className="hero-particles" twinkle />
      <ShootingStars maxActive={8} minInterval={700} maxInterval={1800} />
      <div className="hero-bg-vignette" />
    </div>
  )
}
