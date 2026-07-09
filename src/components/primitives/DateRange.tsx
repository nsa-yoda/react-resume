import { formatDate } from '../../lib/dates'

interface DateRangeProps {
  className?: string
  end?: string
  start: string
  title?: string
}

export default function DateRange({
  className = 'date',
  end = '',
  start,
  title,
}: DateRangeProps) {
  return (
    <div className={className} title={title}>
      {formatDate(start)}
      {end ? ` ${String.fromCodePoint(0x02794)} ` : ''}
      {formatDate(end)}
    </div>
  )
}
