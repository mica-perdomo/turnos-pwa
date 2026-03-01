import { useMemo, useState } from 'react'
import { Calendar, ChevronDown } from 'lucide-react'
import { getUpcomingHolidays } from '../../lib/holidays'
import { getShift } from '../../lib/shiftCycle'
import { SHIFT_COLORS, MONTHS_ES } from '../../lib/constants'

interface Props {
  production: number
}

export function UpcomingHolidays({ production }: Props) {
  const holidays = useMemo(() => getUpcomingHolidays(10), [])
  const [open, setOpen] = useState(false)

  if (holidays.length === 0) return null

  const visible = open ? holidays : holidays.slice(0, 2)

  return (
    <div className="rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
      {/* Header — always tappable */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full px-4 py-3 min-h-[44px]"
      >
        <Calendar size={16} className="text-amber-400" />
        <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 flex-1 text-left">
          Próximos feriados
        </span>
        <ChevronDown
          size={16}
          className={`text-neutral-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* List */}
      <div className="px-4 pb-3 space-y-2">
        {visible.map((h, i) => {
          const shift = getShift(h.date, production)
          const day = h.date.getDate()
          const month = MONTHS_ES[h.date.getMonth()].slice(0, 3)
          return (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 text-center">
                <div className="text-xs text-neutral-400 dark:text-neutral-500 uppercase">{month}</div>
                <div className="text-sm font-bold text-neutral-700 dark:text-neutral-200">{day}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-neutral-700 dark:text-neutral-200 truncate">
                  {h.name}
                </div>
              </div>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${SHIFT_COLORS.bg[shift]} ${SHIFT_COLORS.text[shift]}`}
              >
                {shift === 0 ? 'Franco' : `${shift}er`}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
