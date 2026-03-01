import { Clock, Sunrise, AlertTriangle } from 'lucide-react'
import { SHIFT_LABELS, SHIFT_TIMES, SHIFT_COLORS } from '../../lib/constants'
import type { DayInfo } from '../../hooks/useShiftData'

interface Props {
  today: DayInfo
  tomorrow: DayInfo
  production: number
}

export function TodayBanner({ today, tomorrow, production }: Props) {
  return (
    <div
      className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 divide-y divide-slate-200 dark:divide-slate-700"
    >
      {/* Today — single row */}
      <div className={`flex items-center gap-3 px-3 py-2.5 ${SHIFT_COLORS.bg[today.shift]}`}>
        <Clock size={16} className={SHIFT_COLORS.text[today.shift]} />
        <span className="text-xs text-slate-500 dark:text-slate-400 uppercase">Hoy</span>
        <span className={`font-bold ${SHIFT_COLORS.text[today.shift]}`}>
          {SHIFT_LABELS[today.shift]}
        </span>
        {SHIFT_TIMES[today.shift] && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {SHIFT_TIMES[today.shift]}
          </span>
        )}
        <span className="ml-auto text-[10px] text-slate-400 dark:text-slate-500">
          P{production}
          {today.shift !== 0 && today.relief.relievesProduction > 0 &&
            ` · releva P${today.relief.relievesProduction}`}
        </span>
        {today.holiday && (
          <AlertTriangle size={12} className="text-amber-400 shrink-0" />
        )}
      </div>

      {/* Tomorrow — single row */}
      <div className={`flex items-center gap-3 px-3 py-2.5 ${SHIFT_COLORS.bg[tomorrow.shift]}`}>
        <Sunrise size={16} className={SHIFT_COLORS.text[tomorrow.shift]} />
        <span className="text-xs text-slate-500 dark:text-slate-400 uppercase">Mañana</span>
        <span className={`font-bold ${SHIFT_COLORS.text[tomorrow.shift]}`}>
          {SHIFT_LABELS[tomorrow.shift]}
        </span>
        {SHIFT_TIMES[tomorrow.shift] && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {SHIFT_TIMES[tomorrow.shift]}
          </span>
        )}
        {tomorrow.holiday && (
          <div className="ml-auto flex items-center gap-1">
            <AlertTriangle size={12} className="text-amber-400" />
            <span className="text-[10px] text-amber-400 font-medium">{tomorrow.holiday.name}</span>
          </div>
        )}
      </div>
    </div>
  )
}
