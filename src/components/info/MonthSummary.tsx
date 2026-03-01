import { SHIFT_COLORS, MONTHS_ES } from '../../lib/constants'
import type { MonthSummary as MonthSummaryType } from '../../hooks/useShiftData'

const legendLabels = ['Franco', '1er', '2do', '3er turno']
const shareLegendLabels = ['Franco', '06:00 a 14:00', '14:00 a 22:00', '22:00 a 06:00']

interface LegendProps {
  forShare?: boolean
}

export function CalendarLegend({ forShare = false }: LegendProps) {
  const labels = forShare ? shareLegendLabels : legendLabels
  return (
    <div className="flex items-center gap-3 text-xs flex-wrap py-3 px-1">
      {labels.map((label, i) => (
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
  )
}

interface Props {
  summary: MonthSummaryType
  month: number
}

const countLabels = ['francos', 'primeros', 'segundos', 'terceros']

export function MonthSummary({ summary, month }: Props) {
  return (
    <div className="text-xs text-neutral-500 dark:text-neutral-400 px-1">
      <span className="text-neutral-400 dark:text-neutral-500">{MONTHS_ES[month]}:</span>
      {summary.shifts.map((count, i) => (
        <span key={i}>
          {' '}<span className="font-bold text-neutral-600 dark:text-neutral-300">{count}</span> {countLabels[i]}
          {i < 3 && ' ·'}
        </span>
      ))}
    </div>
  )
}
