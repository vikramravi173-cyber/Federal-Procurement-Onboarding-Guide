/** Large gold moon in the corner with soft fade into the backdrop. */
export function GoldMoon() {
  return (
    <div className="gold-moon" aria-hidden="true">
      <div className="gold-moon__fade" />
      <div className="gold-moon__glow" />
      <svg className="gold-moon__sphere" viewBox="0 0 200 200" fill="none">
        <defs>
          <radialGradient id="moon-face" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#fff8e0" />
            <stop offset="35%" stopColor="#f0d78c" />
            <stop offset="70%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#6b5520" />
          </radialGradient>
          <radialGradient id="moon-shade" cx="75%" cy="70%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="88" fill="url(#moon-face)" />
        <circle cx="100" cy="100" r="88" fill="url(#moon-shade)" />
        <circle cx="72" cy="78" r="14" fill="rgba(0,0,0,0.12)" />
        <circle cx="118" cy="92" r="9" fill="rgba(0,0,0,0.1)" />
        <circle cx="95" cy="118" r="11" fill="rgba(0,0,0,0.08)" />
        <circle cx="130" cy="68" r="6" fill="rgba(0,0,0,0.07)" />
        <ellipse cx="145" cy="105" rx="5" ry="7" fill="rgba(255,248,220,0.15)" />
      </svg>
    </div>
  )
}
