import type { ReactNode } from 'react'
import './DetailRows.css'

interface DetailRowsProps<T> {
  asideClassName?: string
  descriptionFor: (item: T, index: number) => ReactNode
  items: T[]
  keyFor?: (item: T, index: number) => string | number
  renderAside: (item: T, index: number) => ReactNode
  showSeparator?: boolean
  titleFor: (item: T, index: number) => ReactNode
}

export default function DetailRows({
  asideClassName = '',
  descriptionFor,
  items,
  keyFor = (_, index) => index,
  renderAside,
  showSeparator = true,
  titleFor,
}: DetailRowsProps<any>) {
  return (
    <>
      {items.map((item, index) => (
        <div
          className={`row detail-row ${showSeparator ? 'detail-separator' : ''}`.trim()}
          key={keyFor(item, index)}
        >
          <div className='col-md-9 detail-copy'>
            <strong className='detail-title'>{titleFor(item, index)}</strong>
            <div className='detail-description'>
              {descriptionFor(item, index)}
            </div>
          </div>
          <div className={`col-md-3 detail-aside ${asideClassName}`.trim()}>
            {renderAside(item, index)}
          </div>
        </div>
      ))}
    </>
  )
}
