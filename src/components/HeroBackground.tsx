import { GoldSun } from './GoldSun'
import { ParticleNetwork } from './ParticleNetwork'
import { VectorShootingStars } from './VectorShootingStars'
import { StarField } from './StarField'

/** Dark hero backdrop with stars, gold sun, particles, and shooting stars. */
export function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-bg-base" />
      <GoldSun />
      <StarField className="hero-star-field" density={1.15} />
      <ParticleNetwork className="hero-particles" twinkle />
      <VectorShootingStars maxActive={2} minInterval={5000} maxInterval={12000} />
      <div className="hero-bg-vignette" />
    </div>
  )
}
