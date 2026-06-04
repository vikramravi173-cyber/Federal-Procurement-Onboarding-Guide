/** Thin gold flowing lines between page sections. */
export function FlowingLinesDivider() {
  return (
    <div className="flowing-lines-wrap">
    <svg
      className="flowing-lines"
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
    </svg>
    </div>
  )
}
