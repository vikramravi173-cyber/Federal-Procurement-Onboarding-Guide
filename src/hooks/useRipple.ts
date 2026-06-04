import { useCallback, type MouseEvent } from 'react'

export function useRipple() {
  return useCallback((e: MouseEvent<HTMLElement>) => {
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const ripple = document.createElement('span')
    ripple.className = 'ripple'
    ripple.style.width = `${size}px`
    ripple.style.height = `${size}px`
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`
    target.appendChild(ripple)
    ripple.addEventListener('animationend', () => ripple.remove())
  }, [])
}
