import { X, ArrowRightLeft } from 'lucide-react'
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

  return (
    <div className="mt-3 rounded-xl bg-slate-100 dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            {DOW_NAMES[dow]}
          </div>
          <div className="font-bold text-lg">
            {day.day} de {MONTH_NAMES[day.date.getMonth()]} {day.date.getFullYear()}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>
      </div>

      {/* Current production shift */}
      <div
        className={`rounded-lg p-3 mb-3 ${SHIFT_COLORS.bg[day.shift]}`}
      >
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Producción {production}
        </div>
        <div className={`text-lg font-bold ${SHIFT_COLORS.text[day.shift]}`}>
          {SHIFT_LABELS[day.shift]}
        </div>
        {SHIFT_TIMES[day.shift] && (
          <div className="text-sm text-slate-600 dark:text-slate-300">
            {SHIFT_TIMES[day.shift]}
          </div>
        )}
      </div>

      {/* Relief info */}
      {day.shift !== 0 && (
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 mb-3">
          <ArrowRightLeft size={14} />
          <div>
            {relief.relievesProduction > 0 && (
              <span>Releva a Prod. {relief.relievesProduction}</span>
            )}
            {relief.relievesProduction > 0 && relief.relievedByProduction > 0 && (
              <span> · </span>
            )}
            {relief.relievedByProduction > 0 && (
              <span>Lo releva Prod. {relief.relievedByProduction}</span>
            )}
          </div>
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
            <div className="text-[10px] text-slate-500 dark:text-slate-400">P{i + 1}</div>
            <div className={`text-xs font-bold ${SHIFT_COLORS.text[s]}`}>
              {s === 0 ? 'F' : `${s}º`}
            </div>
          </div>
        ))}
      </div>

      {/* Holidays */}
      {day.holidays.length > 0 && (
        <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700">
          {day.holidays.map((h, i) => (
            <div key={i} className="text-sm text-amber-500 dark:text-amber-400">
              {h.name}
              {h.moved && (
                <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                  (trasladado)
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
