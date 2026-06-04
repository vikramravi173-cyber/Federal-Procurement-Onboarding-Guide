import { GoldMoon } from './GoldMoon'
import { ParticleNetwork } from './ParticleNetwork'
import { ShootingStars } from './ShootingStars'
import { StarField } from './StarField'

/** Dark hero backdrop with stars, moon, particles, and shooting stars. */
export function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-bg-base" />
      <GoldMoon />
      <StarField className="hero-star-field" density={1.15} />
      <ParticleNetwork className="hero-particles" twinkle />
      <ShootingStars maxActive={7} minInterval={800} maxInterval={2000} />
      <div className="hero-bg-vignette" />
    </div>
  )
}
