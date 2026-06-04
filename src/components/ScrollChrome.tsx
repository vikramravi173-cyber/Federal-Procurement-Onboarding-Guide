import { useEffect } from 'react'

/** Fixed scroll progress bar and document scroll state for themed scrollbar glow. */
export function ScrollChrome() {
  useEffect(() => {
    const root = document.documentElement
    let ticking = false
    let scrollEndTimer = 0

    const updateProgress = () => {
      const max = root.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      root.style.setProperty('--scroll-progress', String(progress))
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateProgress)
      }

      root.classList.add('is-scrolling')
      window.clearTimeout(scrollEndTimer)
      scrollEndTimer = window.setTimeout(() => {
        root.classList.remove('is-scrolling')
      }, 520)
    }

    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateProgress)
      window.clearTimeout(scrollEndTimer)
      root.classList.remove('is-scrolling')
      root.style.removeProperty('--scroll-progress')
    }
  }, [])

  return <div className="scroll-progress" aria-hidden="true" />
}
