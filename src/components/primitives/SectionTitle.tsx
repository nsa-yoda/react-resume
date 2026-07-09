import type { ReactNode } from 'react'

interface SectionTitleProps {
  children: ReactNode
}

export default function SectionTitle({
  children,
}: SectionTitleProps): JSX.Element {
  return <h2 className='row'>{children}</h2>
}
