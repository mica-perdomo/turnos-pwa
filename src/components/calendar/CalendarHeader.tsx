import { DAYS_SHORT } from '../../lib/constants'

export function CalendarHeader() {
  return (
    <div className="grid grid-cols-7 gap-1 mb-1">
      {DAYS_SHORT.map((d, i) => (
        <div
          key={d}
          className={`text-center text-xs font-semibold py-1 ${
            i === 0 || i === 6
              ? 'text-neutral-700 dark:text-neutral-200'
              : 'text-neutral-500 dark:text-neutral-400'
          }`}
        >
          {d}
        </div>
      ))}
    </div>
  )
}
