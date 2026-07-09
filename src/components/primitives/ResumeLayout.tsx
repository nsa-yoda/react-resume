import type { ReactNode } from 'react'

interface ResumeLayoutProps {
  children: ReactNode
  className?: string
}

export default function ResumeLayout({
  children,
  className = '',
}: ResumeLayoutProps) {
  return (
    <div className={`container exp-container ${className}`.trim()}>
      {children}
    </div>
  )
}
