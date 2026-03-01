import { SHIFT_COLORS } from '../../lib/constants'
import type { MonthSummary as MonthSummaryType } from '../../hooks/useShiftData'

interface Props {
  summary: MonthSummaryType
}

const labels = ['Franco', '1er', '2do', '3er']

export function MonthSummary({ summary }: Props) {
  return (
    <div className="flex items-center justify-center gap-3 py-3 text-xs">
      {summary.shifts.map((count, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${SHIFT_COLORS.dot[i]}`} />
          <span className="text-slate-500 dark:text-slate-400">{labels[i]}</span>
          <span className="font-bold text-slate-700 dark:text-slate-200">{count}</span>
        </div>
      ))}
    </div>
  )
}
