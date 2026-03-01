import { DAYS_SHORT } from '../../lib/constants'

export function CalendarHeader() {
  return (
    <div className="grid grid-cols-7 gap-1 mb-1">
      {DAYS_SHORT.map((d) => (
        <div
          key={d}
          className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 py-1"
        >
          {d}
        </div>
      ))}
    </div>
  )
}
