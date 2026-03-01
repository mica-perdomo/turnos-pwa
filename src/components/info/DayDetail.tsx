import { useEffect, useRef, useState } from 'react'
import { X, Sunrise, Sunset, Moon, BedDouble } from 'lucide-react'
import type { CalendarDay } from '../../lib/calendar'
import { getRelief } from '../../lib/relief'
import { getAllShifts } from '../../lib/shiftCycle'
import { SHIFT_LABELS, SHIFT_TIMES, SHIFT_COLORS, PROD_COLORS } from '../../lib/constants'

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

  // Swipe down to dismiss
  const [dragY, setDragY] = useState(0)
  const startY = useRef(0)
  const dragging = useRef(false)

  const onTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
    dragging.current = true
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current) return
    const dy = e.touches[0].clientY - startY.current
    setDragY(Math.max(0, dy))
  }
  const onTouchEnd = () => {
    dragging.current = false
    if (dragY > 100) {
      onClose()
    }
    setDragY(0)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" style={{ opacity: Math.max(0, 1 - dragY / 300) }} />

      {/* Sheet */}
      <div
        className="relative w-full max-w-md bg-white dark:bg-neutral-800 rounded-t-2xl p-5 pb-[max(env(safe-area-inset-bottom,0px),32px)] animate-slide-up"
        style={{ transform: `translateY(${dragY}px)`, transition: dragging.current ? 'none' : 'transform 0.2s ease-out' }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Handle */}
        <div className="flex justify-center mb-4">
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
            className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 flex items-center justify-center -mt-1 -mr-1"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Current production shift */}
        <div className={`flex items-center rounded-xl p-4 mb-4 ${SHIFT_COLORS.bg[day.shift]}`}>
          <div className="flex-1">
            <span className={`inline-block px-2.5 py-0.5 rounded-full ${PROD_COLORS.bg[production]} text-white text-[11px] font-medium mb-2`}>
              Producción {production}
            </span>
            <div className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
              {SHIFT_LABELS[day.shift]}
            </div>
            {SHIFT_TIMES[day.shift] && (
              <div className="text-lg font-semibold text-neutral-500 dark:text-neutral-400">
                {SHIFT_TIMES[day.shift]}
              </div>
            )}
          </div>
          {day.shift === 0 && <BedDouble size={40} className="text-neutral-400/50 dark:text-neutral-500/50" />}
          {day.shift === 1 && <Sunrise size={40} className="text-red-400/50 dark:text-red-400/40" />}
          {day.shift === 2 && <Sunset size={40} className="text-green-400/50 dark:text-green-400/40" />}
          {day.shift === 3 && <Moon size={40} className="text-blue-400/50 dark:text-blue-400/40" />}
        </div>

        {/* Relief info */}
        {day.shift !== 0 && (relief.relievesProduction > 0 || relief.relievedByProduction > 0) && (
          <div className="flex items-center justify-center gap-2 my-10">
            {relief.relievesProduction > 0 && (
              <>
                <div className={`w-10 h-10 rounded-full ${PROD_COLORS.bg[relief.relievesProduction]} flex items-center justify-center font-bold text-sm text-white`}>
                  P{relief.relievesProduction}
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500">releva a</span>
                  <span className="text-neutral-400 dark:text-neutral-500">→</span>
                </div>
              </>
            )}
            <div className={`w-10 h-10 rounded-full ${PROD_COLORS.bg[production]} flex items-center justify-center font-bold text-sm text-white ring-2 ring-white dark:ring-neutral-800`}>
              P{production}
            </div>
            {relief.relievedByProduction > 0 && (
              <>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500">lo releva</span>
                  <span className="text-neutral-400 dark:text-neutral-500">→</span>
                </div>
                <div className={`w-10 h-10 rounded-full ${PROD_COLORS.bg[relief.relievedByProduction]} flex items-center justify-center font-bold text-sm text-white`}>
                  P{relief.relievedByProduction}
                </div>
              </>
            )}
          </div>
        )}

        {/* All productions */}
        <div className="grid grid-cols-4 gap-2">
          {allShifts.map((s, i) => (
            <div
              key={i}
              className={`text-center p-2 rounded-lg ${SHIFT_COLORS.bg[s]} ${
                i + 1 === production ? `ring-2 ring-current ${PROD_COLORS.text[i + 1]}` : ''
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
          <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-700">
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
