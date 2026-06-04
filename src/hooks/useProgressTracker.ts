import { useCallback, useEffect, useState } from 'react'

const COMPLETED_KEY = 'federal-procurement-completed-steps'
const ACTIVE_INDEX_KEY = 'federal-procurement-active-index'

export function useProgressTracker(trackableIds: string[], maxNavIndex: number) {
  const [completed, setCompleted] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(COMPLETED_KEY)
      if (stored) return new Set(JSON.parse(stored) as string[])
    } catch {
      /* ignore */
    }
    return new Set()
  })

  const [activeIndex, setActiveIndexState] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(ACTIVE_INDEX_KEY)
      if (stored) return parseInt(stored, 10) || 0
    } catch {
      /* ignore */
    }
    return 0
  })

  useEffect(() => {
    localStorage.setItem(COMPLETED_KEY, JSON.stringify([...completed]))
  }, [completed])

  useEffect(() => {
    localStorage.setItem(ACTIVE_INDEX_KEY, String(activeIndex))
  }, [activeIndex])

  const toggle = useCallback((id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const setActiveIndex = useCallback(
    (index: number) => {
      setActiveIndexState(Math.max(0, Math.min(index, maxNavIndex)))
    },
    [maxNavIndex],
  )

  const reset = useCallback(() => {
    setCompleted(new Set())
    setActiveIndexState(0)
    localStorage.removeItem(COMPLETED_KEY)
    localStorage.removeItem(ACTIVE_INDEX_KEY)
  }, [])

  const completedCount = trackableIds.filter((id) => completed.has(id)).length
  const progress = trackableIds.length > 0 ? (completedCount / trackableIds.length) * 100 : 0
  const allComplete = completedCount === trackableIds.length && trackableIds.length > 0

  return {
    completed,
    toggle,
    reset,
    completedCount,
    progress,
    allComplete,
    activeIndex,
    setActiveIndex,
  }
}
