import { useCallback, useRef, useState } from 'react'
import { ProgressBar } from './components/ProgressBar'
import { StepCard } from './components/StepCard'
import { onboardingSteps } from './data/steps'
import { useCompletedSteps } from './hooks/useCompletedSteps'
import './App.css'

const stepIds = onboardingSteps.map((s) => s.id)

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const { completed, toggle, reset, completedCount, progress, allComplete } =
    useCompletedSteps(stepIds)

  const scrollToStep = useCallback((index: number) => {
    setActiveIndex(index)
    cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  const goNext = () => {
    if (activeIndex < onboardingSteps.length - 1) scrollToStep(activeIndex + 1)
  }

  const goPrev = () => {
    if (activeIndex > 0) scrollToStep(activeIndex - 1)
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-badge">Small Business Guide</div>
        <h1>Federal Procurement Onboarding</h1>
        <p className="hero-subtitle">
          A step-by-step walkthrough to help your small business navigate the federal
          contracting process — from registration to your first bid.
        </p>
      </header>

      <div className="sticky-bar">
        <ProgressBar
          completedCount={completedCount}
          total={onboardingSteps.length}
          progress={progress}
        />

        <nav className="step-nav" aria-label="Step navigation">
          {onboardingSteps.map((step, i) => (
            <button
              key={step.id}
              type="button"
              className={`step-dot${i === activeIndex ? ' step-dot--active' : ''}${completed.has(step.id) ? ' step-dot--done' : ''}`}
              onClick={() => scrollToStep(i)}
              aria-label={`Go to step ${i + 1}: ${step.title}`}
              aria-current={i === activeIndex ? 'step' : undefined}
            >
              {completed.has(step.id) ? '✓' : i + 1}
            </button>
          ))}
        </nav>
      </div>

      <main className="steps-container">
        {onboardingSteps.map((step, index) => (
          <div
            key={step.id}
            ref={(el) => {
              cardRefs.current[index] = el
            }}
          >
            <StepCard
              step={step}
              index={index}
              isCompleted={completed.has(step.id)}
              isActive={index === activeIndex}
              onToggle={() => toggle(step.id)}
              onFocus={() => setActiveIndex(index)}
            />
          </div>
        ))}
      </main>

      <footer className="nav-footer">
        <button type="button" className="nav-btn" onClick={goPrev} disabled={activeIndex === 0}>
          ← Previous
        </button>
        <span className="nav-indicator">
          Step {activeIndex + 1} of {onboardingSteps.length}
        </span>
        <button
          type="button"
          className="nav-btn nav-btn--primary"
          onClick={goNext}
          disabled={activeIndex === onboardingSteps.length - 1}
        >
          Next →
        </button>
      </footer>

      {allComplete && (
        <div className="completion-banner" role="status">
          <span>🎉</span>
          <div>
            <strong>You&apos;ve completed all steps!</strong>
            <p>You&apos;re ready to pursue federal contracts. Good luck!</p>
          </div>
          <button type="button" className="reset-btn" onClick={reset}>
            Start over
          </button>
        </div>
      )}
    </div>
  )
}

export default App
