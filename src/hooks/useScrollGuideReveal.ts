import { useEffect, useRef, useState, type RefObject } from 'react'

const MIN_OPACITY = 0.55
const MAX_OPACITY = 1

function strengthFromRatio(ratio: number): number {
  if (ratio <= 0) return MIN_OPACITY
  const eased = Math.min(1, ratio * 1.75 + 0.12)
  return MIN_OPACITY + (MAX_OPACITY - MIN_OPACITY) * eased
}

export function useScrollGuideReveal(
  cardRefs: RefObject<(HTMLElement | null)[]>,
  navigableIndices: number[],
  setActiveIndex: (index: number) => void,
) {
  const [revealByIndex, setRevealByIndex] = useState<Record<number, number>>({})
  const peakRevealRef = useRef<Record<number, number>>({})
  const lastActiveRef = useRef(-1)

  useEffect(() => {
    if (navigableIndices.length === 0) return

    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20)

    const observer = new IntersectionObserver(
      (entries) => {
        let bestIndex = -1
        let bestRatio = 0

        setRevealByIndex((prev) => {
          const next = { ...prev }

          for (const entry of entries) {
            const idx = Number((entry.target as HTMLElement).dataset.guideIndex)
            if (Number.isNaN(idx)) continue

            const fromView = strengthFromRatio(entry.intersectionRatio)
            const peak = Math.max(peakRevealRef.current[idx] ?? MIN_OPACITY, fromView)
            if (entry.intersectionRatio > 0) {
              peakRevealRef.current[idx] = peak
            }
            next[idx] = peak
          }

          return next
        })

        for (const entry of entries) {
          const idx = Number((entry.target as HTMLElement).dataset.guideIndex)
          if (Number.isNaN(idx) || !entry.isIntersecting) continue
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio
            bestIndex = idx
          }
        }

        if (bestIndex >= 0 && bestRatio >= 0.2 && lastActiveRef.current !== bestIndex) {
          lastActiveRef.current = bestIndex
          setActiveIndex(bestIndex)
        }
      },
      {
        threshold: thresholds,
        rootMargin: '-10% 0px -38% 0px',
      },
    )

    const observeAll = () => {
      observer.disconnect()
      for (const idx of navigableIndices) {
        const el = cardRefs.current[idx]
        if (el) observer.observe(el)
      }
    }

    observeAll()

    const resizeObserver = new ResizeObserver(observeAll)
    const first = cardRefs.current[navigableIndices[0]]
    if (first?.parentElement) resizeObserver.observe(first.parentElement)

    return () => {
      observer.disconnect()
      resizeObserver.disconnect()
    }
  }, [navigableIndices, cardRefs, setActiveIndex])

  useEffect(() => {
    peakRevealRef.current = {}
    const initial: Record<number, number> = {}
    if (navigableIndices[0] !== undefined) {
      initial[navigableIndices[0]] = MAX_OPACITY
      peakRevealRef.current[navigableIndices[0]] = MAX_OPACITY
    }
    setRevealByIndex(initial)
  }, [navigableIndices])

  const getReveal = (index: number) => revealByIndex[index] ?? MIN_OPACITY

  const isLocked = (index: number) => getReveal(index) < 0.92

  return { getReveal, isLocked }
}
