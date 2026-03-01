import type { CalendarDay } from '../../lib/calendar'
import { SHIFT_COLORS } from '../../lib/constants'

interface Props {
  day: CalendarDay
  selected: boolean
  onSelect: (day: CalendarDay) => void
  hasNote: boolean
}

export function DayCell({ day, selected, onSelect, hasNote }: Props) {
  const hasHoliday = day.holidays.length > 0
  const isOtherMonth = !day.isCurrentMonth

  return (
    <button
      type="button"
      onClick={() => onSelect(day)}
      className={`
        relative flex flex-col items-center justify-center
        min-h-11 min-w-11 rounded-lg text-sm
        transition-all duration-150
        ${isOtherMonth ? 'opacity-30' : ''}
        ${day.isToday ? `border-2 ${SHIFT_COLORS.borderToday[day.shift]}` : hasHoliday ? 'border-2 border-amber-400' : 'border-2 border-transparent'}
        ${selected ? 'ring-2 ring-white/60 dark:ring-white/40' : ''}
        ${day.isToday ? SHIFT_COLORS.bgToday[day.shift] : SHIFT_COLORS.bg[day.shift]}
        ${day.isToday ? 'font-bold' : 'font-medium'}
      `}
    >
      <span className={SHIFT_COLORS.text[day.shift]}>{day.day}</span>
      {hasNote && (
        <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-500" />
      )}
    </button>
  )
}
