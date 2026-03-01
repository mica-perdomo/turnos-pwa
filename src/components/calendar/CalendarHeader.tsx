import { DAYS_SHORT } from '../../lib/constants'

export function CalendarHeader() {
  return (
    <div className="grid grid-cols-7 gap-1 mb-1">
      {DAYS_SHORT.map((d, i) => (
        <div
          key={d}
          className={`text-center text-xs font-semibold py-1 ${
            i === 0 || i === 6
              ? 'text-slate-700 dark:text-slate-200'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          {d}
        </div>
      ))}
    </div>
  )
}
