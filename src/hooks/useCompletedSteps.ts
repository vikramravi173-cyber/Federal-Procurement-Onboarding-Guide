import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'federal-procurement-completed-steps'

export function useCompletedSteps(stepIds: string[]) {
  const [completed, setCompleted] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return new Set(JSON.parse(stored) as string[])
    } catch {
      /* ignore parse errors */
    }
    return new Set()
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]))
  }, [completed])

  const toggle = useCallback((id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const reset = useCallback(() => setCompleted(new Set()), [])

  const completedCount = stepIds.filter((id) => completed.has(id)).length
  const progress = stepIds.length > 0 ? (completedCount / stepIds.length) * 100 : 0
  const allComplete = completedCount === stepIds.length && stepIds.length > 0

  return { completed, toggle, reset, completedCount, progress, allComplete }
}
