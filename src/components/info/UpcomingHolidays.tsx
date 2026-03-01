import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { getUpcomingHolidays } from '../../lib/holidays'
import { getShift } from '../../lib/shiftCycle'
import { SHIFT_COLORS, MONTHS_ES, DAYS_SHORT } from '../../lib/constants'

interface Props {
  production: number
}

export function UpcomingHolidays({ production }: Props) {
  const holidays = useMemo(() => getUpcomingHolidays(10), [])
  const [open, setOpen] = useState(false)

  if (holidays.length === 0) return null

  const visible = open ? holidays : holidays.slice(0, 3)

  return (
    <div className="rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full px-4 py-3"
      >
        <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 flex-1 text-left">
          Próximos feriados
        </span>
        <ChevronDown
          size={16}
          className={`text-neutral-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* List */}
      <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
        {visible.map((h, i) => {
          const shift = getShift(h.date, production)
          const day = h.date.getDate()
          const monthName = MONTHS_ES[h.date.getMonth()].slice(0, 3)
          const dow = DAYS_SHORT[h.date.getDay()]
          return (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <div className="w-11 h-11 rounded-lg bg-neutral-200 dark:bg-neutral-700 flex flex-col items-center justify-center shrink-0">
                <span className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400 uppercase leading-none">{monthName}</span>
                <span className="text-lg font-bold text-neutral-700 dark:text-neutral-200 leading-tight">{day}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate">
                  {h.name}
                </div>
                <div className="text-xs text-neutral-400 dark:text-neutral-500">
                  {dow}
                </div>
              </div>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${SHIFT_COLORS.bg[shift]} ${SHIFT_COLORS.text[shift]}`}
              >
                {shift === 0 ? 'Franco' : `${shift}er`}
              </span>
            </div>
          )
        })}
      </div>

      {/* Show more */}
      {!open && holidays.length > 3 && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full py-2.5 text-xs font-medium text-indigo-500 dark:text-indigo-400 border-t border-neutral-200 dark:border-neutral-700"
        >
          Ver {holidays.length - 3} más
        </button>
      )}
    </div>
  )
}
