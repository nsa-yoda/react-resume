import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
}

export default function Badge({ children }: BadgeProps): JSX.Element {
  return <span className='resume-badge'>{children}</span>
}
