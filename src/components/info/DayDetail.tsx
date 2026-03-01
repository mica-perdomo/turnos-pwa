import { useEffect } from 'react'
import { X } from 'lucide-react'
import type { CalendarDay } from '../../lib/calendar'
import { getRelief } from '../../lib/relief'
import { getAllShifts } from '../../lib/shiftCycle'
import { SHIFT_LABELS, SHIFT_TIMES, SHIFT_COLORS } from '../../lib/constants'

interface Props {
  day: CalendarDay
  production: number
  onClose: () => void
}

const DOW_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const MONTH_NAMES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre',
]

export function DayDetail({ day, production, onClose }: Props) {
  const relief = getRelief(day.date, production)
  const allShifts = getAllShifts(day.date)
  const dow = day.date.getDay()

  // Close on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Sheet */}
      <div
        className="relative w-full max-w-md bg-white dark:bg-neutral-800 rounded-t-2xl p-5 pb-[env(safe-area-inset-bottom,20px)] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center mb-3">
          <div className="w-10 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
              {DOW_NAMES[dow]}
            </div>
            <div className="font-bold text-lg">
              {day.day} de {MONTH_NAMES[day.date.getMonth()]} {day.date.getFullYear()}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Current production shift */}
        <div className={`rounded-xl p-4 mb-3 ${SHIFT_COLORS.bg[day.shift]}`}>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
            Producción {production}
          </div>
          <div className={`text-2xl font-bold ${SHIFT_COLORS.text[day.shift]}`}>
            {SHIFT_LABELS[day.shift]}
          </div>
          {SHIFT_TIMES[day.shift] && (
            <div className={`text-lg font-semibold ${SHIFT_COLORS.text[day.shift]} opacity-80`}>
              {SHIFT_TIMES[day.shift]}
            </div>
          )}
        </div>

        {/* Relief info */}
        {day.shift !== 0 && (
          <div className="flex gap-2 mb-3 text-xs">
            {relief.relievesProduction > 0 && (
              <div className="flex-1 rounded-lg bg-neutral-100 dark:bg-neutral-700/60 px-3 py-2">
                <div className="text-neutral-400 dark:text-neutral-500">Releva a</div>
                <div className="font-bold text-neutral-700 dark:text-neutral-200">
                  Producción {relief.relievesProduction}
                </div>
              </div>
            )}
            {relief.relievedByProduction > 0 && (
              <div className="flex-1 rounded-lg bg-neutral-100 dark:bg-neutral-700/60 px-3 py-2">
                <div className="text-neutral-400 dark:text-neutral-500">Lo releva</div>
                <div className="font-bold text-neutral-700 dark:text-neutral-200">
                  Producción {relief.relievedByProduction}
                </div>
              </div>
            )}
          </div>
        )}

        {/* All productions */}
        <div className="grid grid-cols-4 gap-2">
          {allShifts.map((s, i) => (
            <div
              key={i}
              className={`text-center p-2 rounded-lg ${SHIFT_COLORS.bg[s]} ${
                i + 1 === production ? 'ring-2 ring-indigo-500' : ''
              }`}
            >
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400">P{i + 1}</div>
              <div className={`text-xs font-bold ${SHIFT_COLORS.text[s]}`}>
                {s === 0 ? 'F' : `${s}º`}
              </div>
            </div>
          ))}
        </div>

        {/* Holidays */}
        {day.holidays.length > 0 && (
          <div className="mt-3 pt-2 border-t border-neutral-200 dark:border-neutral-700">
            {day.holidays.map((h, i) => (
              <div key={i} className="text-sm text-amber-500 dark:text-amber-400">
                {h.name}
                {h.moved && (
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-1">
                    (trasladado)
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
