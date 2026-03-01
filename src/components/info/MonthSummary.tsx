import { SHIFT_COLORS, MONTHS_ES } from '../../lib/constants'
import type { MonthSummary as MonthSummaryType } from '../../hooks/useShiftData'

interface Props {
  summary: MonthSummaryType
  month: number
}

const legendLabels = ['Franco', '1er', '2do', '3er turno']
const countLabels = ['francos', 'primeros', 'segundos', 'terceros']

export function MonthSummary({ summary, month }: Props) {
  return (
    <div className="py-3 px-1 space-y-2">
      {/* Color legend */}
      <div className="flex items-center gap-3 text-xs flex-wrap">
        {legendLabels.map((label, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${SHIFT_COLORS.dot[i]}`} />
            <span className="text-neutral-500 dark:text-neutral-400">{label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded border-[1.5px] border-amber-400" />
          <span className="text-neutral-500 dark:text-neutral-400">Feriado</span>
        </div>
      </div>

      {/* Month count */}
      <div className="text-xs text-neutral-500 dark:text-neutral-400">
        <span className="text-neutral-400 dark:text-neutral-500">{MONTHS_ES[month]}:</span>
        {summary.shifts.map((count, i) => (
          <span key={i}>
            {' '}<span className="font-bold text-neutral-600 dark:text-neutral-300">{count}</span> {countLabels[i]}
            {i < 3 && ' ·'}
          </span>
        ))}
      </div>
    </div>
  )
}
