export function GuideSkeleton() {
  return (
    <div className="guide-skeleton" aria-busy="true" aria-label="Loading your guide">
      <div className="skeleton skeleton--hero" />
      <div className="skeleton skeleton--bar" />
      <div className="skeleton skeleton--card" />
      <div className="skeleton skeleton--card skeleton--card-short" />
      <div className="skeleton skeleton--card" />
    </div>
  )
}

export function GlossarySkeleton() {
  return (
    <div className="glossary-skeleton" aria-busy="true" aria-hidden="true">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="skeleton skeleton--glossary-row" />
      ))}
    </div>
  )
}
