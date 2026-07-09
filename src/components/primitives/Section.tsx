import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function Section({
  children,
  className = '',
  id,
}: SectionProps): JSX.Element {
  return (
    <div className={`section ${className}`.trim()} id={id}>
      {children}
    </div>
  )
}
