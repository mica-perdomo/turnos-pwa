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
  const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6

  return (
    <button
      type="button"
      onClick={() => onSelect(day)}
      className={`
        relative flex flex-col items-center justify-center
        min-h-[44px] min-w-[44px] rounded-lg text-sm font-medium
        transition-all duration-150
        ${isOtherMonth ? 'opacity-30' : ''}
        ${isWeekend && day.isCurrentMonth ? 'bg-slate-100 dark:bg-slate-800/60' : ''}
        ${day.isToday ? 'today-pulse ring-2 ring-indigo-500' : ''}
        ${selected ? 'ring-2 ring-white/60 dark:ring-white/40' : ''}
        ${hasHoliday ? 'border-2 border-amber-400' : 'border-2 border-transparent'}
        ${SHIFT_COLORS.bg[day.shift]}
      `}
    >
      <span className={SHIFT_COLORS.text[day.shift]}>{day.day}</span>
      {day.shift !== 0 && day.isCurrentMonth && (
        <span
          className={`absolute bottom-0.5 h-1.5 w-1.5 rounded-full ${SHIFT_COLORS.dot[day.shift]}`}
        />
      )}
    </button>
  )
}
