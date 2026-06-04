import { useEffect, useRef } from 'react'
import { burstConfetti } from '../utils/confetti'

interface ProgressBarProps {
  completedCount: number
  total: number
  progress: number
}

const MILESTONES = [25, 50, 75, 100]

export function ProgressBar({ completedCount, total, progress }: ProgressBarProps) {
  const percent = Math.round(progress)
  const triggered = useRef<Set<number>>(new Set())

  useEffect(() => {
    for (const milestone of MILESTONES) {
      if (percent >= milestone && !triggered.current.has(milestone)) {
        triggered.current.add(milestone)
        burstConfetti('subtle')
      }
    }
  }, [percent])

  return (
    <div className="progress-section" aria-label="Onboarding progress">
      <div className="progress-header">
        <span className="progress-label">Your Progress</span>
        <span className="progress-percent" aria-live="polite">
          {percent}%
        </span>
        <span className="progress-count">
          {completedCount} of {total} steps
        </span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
