import type { ReactNode } from 'react'

export interface LinkListItem {
  id?: string | number
  url?: string
  label?: string
}

interface LinkListProps<T> {
  className?: string
  items?: T[]
  renderItem: (item: T) => ReactNode
}

export default function LinkList<T>({
  className = '',
  items = [],
  renderItem,
}: LinkListProps<T>) {
  return (
    <ul className={className}>
      {items.map((item, index) => (
        <li
          key={
            typeof item === 'object' && item !== null
              ? (item as LinkListItem).id ||
                (item as LinkListItem).url ||
                (item as LinkListItem).label ||
                index
              : index
          }
        >
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}
