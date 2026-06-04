/** Decorative procurement-themed hero backdrop (purely visual). */
export function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-bg-gradient" />
      <div className="hero-bg-doc-lines" />
      <div className="hero-bg-network">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
              <stop offset="50%" stopColor="#d4af37" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g stroke="url(#lineGrad)" strokeWidth="0.6" fill="none" opacity="0.5">
            <line x1="120" y1="80" x2="280" y2="200" />
            <line x1="280" y1="200" x2="400" y2="120" />
            <line x1="400" y1="120" x2="520" y2="240" />
            <line x1="520" y1="240" x2="680" y2="160" />
            <line x1="200" y1="320" x2="360" y2="400" />
            <line x1="360" y1="400" x2="500" y2="300" />
            <line x1="500" y1="300" x2="640" y2="420" />
            <line x1="400" y1="120" x2="360" y2="400" />
            <line x1="280" y1="200" x2="500" y2="300" />
          </g>
          <g fill="#d4af37" opacity="0.45">
            <circle cx="120" cy="80" r="3" />
            <circle cx="280" cy="200" r="3" />
            <circle cx="400" cy="120" r="4" />
            <circle cx="520" cy="240" r="3" />
            <circle cx="680" cy="160" r="3" />
            <circle cx="200" cy="320" r="3" />
            <circle cx="360" cy="400" r="3" />
            <circle cx="500" cy="300" r="4" />
            <circle cx="640" cy="420" r="3" />
          </g>
        </svg>
      </div>
      <div className="hero-bg-seal">
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="180" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.12" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="#d4af37" strokeWidth="0.6" opacity="0.1" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.08" />
          <g fill="#d4af37" opacity="0.15">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180
              const x = 200 + Math.cos(rad) * 155
              const y = 200 + Math.sin(rad) * 155
              return <circle key={deg} cx={x} cy={y} r="2.5" />
            })}
          </g>
        </svg>
      </div>
      <svg
        className="hero-bg-skyline"
        viewBox="0 0 1440 220"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.18" />
          </linearGradient>
        </defs>
        <path
          fill="url(#skyFade)"
          d="M0,220 L0,140 L80,120 L120,95 L160,110 L200,75 L240,90 L280,60 L320,80 L360,50 L400,70 L440,45 L480,65 L520,40 L560,55 L600,35 L640,50 L680,30 L720,48 L760,25 L800,42 L840,28 L880,38 L920,22 L960,35 L1000,20 L1040,32 L1080,18 L1120,30 L1160,15 L1200,28 L1240,12 L1280,25 L1320,10 L1360,22 L1400,8 L1440,18 L1440,220 Z"
        />
        <path
          fill="none"
          stroke="#d4af37"
          strokeWidth="1.2"
          opacity="0.22"
          d="M0,220 L0,140 L80,120 L120,95 L160,110 L200,75 L240,90 L280,60 L320,80 L360,50 L400,70 L440,45 L480,65 L520,40 L560,55 L600,35 L640,50 L680,30 L720,48 L760,25 L800,42 L840,28 L880,38 L920,22 L960,35 L1000,20 L1040,32 L1080,18 L1120,30 L1160,15 L1200,28 L1240,12 L1280,25 L1320,10 L1360,22 L1400,8 L1440,18 L1440,220"
        />
        {/* Capitol dome accent */}
        <ellipse cx="720" cy="52" rx="38" ry="22" fill="#d4af37" opacity="0.08" />
        <path
          fill="#d4af37"
          opacity="0.14"
          d="M720,30 Q700,52 720,68 Q740,52 720,30 M720,22 L715,30 L725,30 Z"
        />
      </svg>
      <div className="hero-bg-glow" />
      <div className="hero-bg-vignette" />
    </div>
  )
}
