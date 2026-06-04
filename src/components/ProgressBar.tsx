interface ProgressBarProps {
  completedCount: number
  total: number
  progress: number
}

export function ProgressBar({ completedCount, total, progress }: ProgressBarProps) {
  return (
    <div className="progress-section" aria-label="Onboarding progress">
      <div className="progress-header">
        <span className="progress-label">Your Progress</span>
        <span className="progress-count">
          {completedCount} of {total} steps complete
        </span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
