type FlowingLinesVariant = 'default' | 'subtle' | 'rich' | 'hero'

interface FlowingLinesDividerProps {
  variant?: FlowingLinesVariant
}

/** Thin gold flowing lines between page sections. */
export function FlowingLinesDivider({ variant = 'default' }: FlowingLinesDividerProps) {
  const isRich = variant === 'rich' || variant === 'hero'
  const isHero = variant === 'hero'

  return (
    <div className={`flowing-lines-wrap flowing-lines-wrap--${variant}`}>
      <svg
        className={`flowing-lines${isRich ? ' flowing-lines--rich' : ''}${isHero ? ' flowing-lines--hero' : ''}`}
        viewBox="0 0 1100 56"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="flowing-lines__path"
          d="M0 28 C180 8 360 48 550 28 S920 8 1100 28"
        />
        <path
          className="flowing-lines__path flowing-lines__path--delay-1"
          d="M0 38 Q280 52 520 22 T1100 40"
        />
        <path
          className="flowing-lines__path flowing-lines__path--delay-2"
          d="M0 18 C220 42 480 6 720 32 S980 46 1100 24"
        />
        {isRich && (
          <>
            <path
              className="flowing-lines__path flowing-lines__path--delay-3"
              d="M0 32 Q200 12 440 36 T880 18 T1100 34"
            />
            <path
              className="flowing-lines__path flowing-lines__path--delay-4"
              d="M0 24 C320 44 580 10 820 30 S1020 42 1100 26"
            />
            <path
              className="flowing-lines__path flowing-lines__path--delay-5"
              d="M0 42 Q350 28 700 48 T1100 22"
            />
          </>
        )}
      </svg>
    </div>
  )
}
