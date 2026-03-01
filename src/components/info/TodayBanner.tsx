import { Clock, Sunrise, AlertTriangle } from 'lucide-react'
import { SHIFT_LABELS, SHIFT_TIMES, SHIFT_COLORS, PROD_COLORS } from '../../lib/constants'
import type { DayInfo } from '../../hooks/useShiftData'

interface Props {
  today: DayInfo
  tomorrow: DayInfo
  production: number
}

function Row({
  icon: Icon,
  label,
  day,
  production,
  showRelief,
}: {
  icon: typeof Clock
  label: string
  day: DayInfo
  production: number
  showRelief: boolean
}) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2.5 ${SHIFT_COLORS.bg[day.shift]}`}>
      <Icon size={16} className={`${SHIFT_COLORS.text[day.shift]} shrink-0`} />
      <span className="w-14 text-xs text-neutral-500 dark:text-neutral-400 uppercase leading-none">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="font-bold text-neutral-500 dark:text-neutral-400">
          {SHIFT_LABELS[day.shift]}
        </span>
        {SHIFT_TIMES[day.shift] && (
          <>
            <span className="text-neutral-400 dark:text-neutral-500">·</span>
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              {SHIFT_TIMES[day.shift]}
            </span>
          </>
        )}
      </div>
      <div className="ml-auto flex items-center gap-1.5 shrink-0">
        {showRelief && (
          <>
            <span className={`text-[10px] px-1.5 py-0.5 rounded ${PROD_COLORS.bg[production]} text-white font-medium leading-none`}>
              P{production}
            </span>
            {day.shift !== 0 && day.relief.relievesProduction > 0 && (
              <>
                <span className="text-[10px] text-neutral-400 dark:text-neutral-500 leading-none">→</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${PROD_COLORS.bg[day.relief.relievesProduction]} text-white font-medium leading-none`}>
                  P{day.relief.relievesProduction}
                </span>
              </>
            )}
          </>
        )}
        {day.holiday && (
          <AlertTriangle size={12} className="text-amber-400 shrink-0" />
        )}
      </div>
    </div>
  )
}

export function TodayBanner({ today, tomorrow, production }: Props) {
  return (
    <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 divide-y divide-neutral-200 dark:divide-neutral-700">
      <Row icon={Clock} label="Hoy" day={today} production={production} showRelief={true} />
      <Row icon={Sunrise} label="Mañana" day={tomorrow} production={production} showRelief={true} />
    </div>
  )
}
