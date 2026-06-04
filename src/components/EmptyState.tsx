import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  message: string
}

export function EmptyState({ icon, title, message }: EmptyStateProps) {
  return (
    <div className="empty-state" role="status">
      <div className="empty-state__icon" aria-hidden="true">
        {icon}
      </div>
      <p className="empty-state__title">{title}</p>
      <p className="empty-state__message">{message}</p>
    </div>
  )
}
