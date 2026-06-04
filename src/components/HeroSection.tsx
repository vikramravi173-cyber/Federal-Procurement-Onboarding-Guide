import { useEffect, useState, type ReactNode } from 'react'

const TYPING_PHRASES = [
  'Register on SAM.gov',
  'Get certified as SDVOSB',
  'Win your first federal contract',
]

interface HeroSectionProps {
  subtitle: ReactNode
  onResetProfile: () => void
}

export function HeroSection({ subtitle, onResetProfile }: HeroSectionProps) {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < phrase.length) {
            setDisplayText(phrase.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 1800)
          }
        } else if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setPhraseIndex((i) => (i + 1) % TYPING_PHRASES.length)
        }
      },
      isDeleting ? 40 : 70,
    )
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, phraseIndex])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY * 0.25
      document.documentElement.style.setProperty('--parallax-y', `${y}px`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToGuide = () => {
    document.querySelector('.sticky-bar')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="hero">
      <div className="hero-bg" style={{ transform: 'translateY(var(--parallax-y, 0))' }} aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-badge">Personalized Guide</div>
        <h1>Federal Contract Procurement Guide for Small Businesses</h1>
        <p className="hero-typing" aria-live="polite">
          <span className="hero-typing-text">{displayText}</span>
          <span className="hero-typing-cursor" aria-hidden="true" />
        </p>
        <p className="hero-subtitle">{subtitle}</p>
        <button type="button" className="btn-ripple reset-profile-btn" onClick={onResetProfile}>
          Retake intake
        </button>
      </div>
      <button
        type="button"
        className="hero-scroll-indicator"
        onClick={scrollToGuide}
        aria-label="Scroll to guide"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </header>
  )
}
