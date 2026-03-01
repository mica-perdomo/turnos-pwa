import { SHIFT_COLORS, MONTHS_ES } from '../../lib/constants'
import type { MonthSummary as MonthSummaryType } from '../../hooks/useShiftData'

interface Props {
  summary: MonthSummaryType
  month: number
}

const labels = ['francos', '1er turno', '2do turno', '3er turno']

export function MonthSummary({ summary, month }: Props) {
  return (
    <div className="py-3 px-1">
      <div className="text-[11px] text-slate-400 dark:text-slate-500 mb-1.5">
        {MONTHS_ES[month]}: {summary.total} días
      </div>
      <div className="flex items-center gap-3 text-xs flex-wrap">
        {summary.shifts.map((count, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${SHIFT_COLORS.dot[i]}`} />
            <span className="text-slate-600 dark:text-slate-300">
              <span className="font-bold">{count}</span> {labels[i]}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded border-[1.5px] border-amber-400" />
          <span className="text-slate-600 dark:text-slate-300">feriado</span>
        </div>
      </div>
    </div>
  )
}
