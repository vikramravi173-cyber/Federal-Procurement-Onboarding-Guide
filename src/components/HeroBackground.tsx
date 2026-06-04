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
      <VectorShootingStars maxActive={7} minInterval={800} maxInterval={2000} />
      <div className="hero-bg-vignette" />
    </div>
  )
}
