import type { CalendarDay } from '../../lib/calendar'
import { SHIFT_COLORS } from '../../lib/constants'

interface Props {
  day: CalendarDay
  selected: boolean
  onSelect: (day: CalendarDay) => void
}

export function DayCell({ day, selected, onSelect }: Props) {
  const hasHoliday = day.holidays.length > 0
  const isOtherMonth = !day.isCurrentMonth

  return (
    <button
      type="button"
      onClick={() => onSelect(day)}
      className={`
        relative flex flex-col items-center justify-center
        min-h-11 min-w-11 rounded-lg text-sm font-medium
        transition-all duration-150
        ${isOtherMonth ? 'opacity-30' : ''}
        ${day.isToday ? 'today-pulse ring-2 ring-indigo-500' : ''}
        ${selected ? 'ring-2 ring-white/60 dark:ring-white/40' : ''}
        ${hasHoliday ? 'border-2 border-amber-400' : 'border-2 border-transparent'}
        ${SHIFT_COLORS.bg[day.shift]}
      `}
    >
      <span className={SHIFT_COLORS.text[day.shift]}>{day.day}</span>
      {day.isToday && (
        <span className={`absolute bottom-1 h-1.5 w-1.5 rounded-full ${SHIFT_COLORS.dot[day.shift]}`} />
      )}
    </button>
  )
}
