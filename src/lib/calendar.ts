/**
 * Calendar grid builder.
 * Returns a 6×7 matrix of CalendarDay objects for a given month.
 */

import { getShift } from './shiftCycle'
import { getHolidaysForMonth, type Holiday } from './holidays'

export interface CalendarDay {
  date: Date
  day: number          // day of month
  isCurrentMonth: boolean
  shift: number        // 0|1|2|3
  isToday: boolean
  holidays: Holiday[]
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function buildCalendarGrid(
  year: number,
  month: number,
  production: number,
): CalendarDay[][] {
  const today = new Date()
  const firstOfMonth = new Date(year, month, 1)
  const startDow = firstOfMonth.getDay() // 0=Sun

  // Start from the Sunday at or before the 1st
  const gridStart = new Date(year, month, 1 - startDow)

  const holidayMap = getHolidaysForMonth(year, month)

  // Also get holidays for adjacent months that might appear in the grid
  const prevMonth = month === 0 ? 11 : month - 1
  const prevYear = month === 0 ? year - 1 : year
  const nextMonth = month === 11 ? 0 : month + 1
  const nextYear = month === 11 ? year + 1 : year
  const prevHolidays = getHolidaysForMonth(prevYear, prevMonth)
  const nextHolidays = getHolidaysForMonth(nextYear, nextMonth)

  const grid: CalendarDay[][] = []

  for (let week = 0; week < 6; week++) {
    const row: CalendarDay[] = []
    for (let dow = 0; dow < 7; dow++) {
      const date = new Date(gridStart)
      date.setDate(gridStart.getDate() + week * 7 + dow)

      const isCurrentMonth = date.getMonth() === month && date.getFullYear() === year

      let holidays: Holiday[] = []
      if (isCurrentMonth) {
        holidays = holidayMap.get(date.getDate()) ?? []
      } else if (date.getMonth() === prevMonth) {
        holidays = prevHolidays.get(date.getDate()) ?? []
      } else if (date.getMonth() === nextMonth) {
        holidays = nextHolidays.get(date.getDate()) ?? []
      }

      row.push({
        date,
        day: date.getDate(),
        isCurrentMonth,
        shift: getShift(date, production),
        isToday: isSameDay(date, today),
        holidays,
      })
    }
    grid.push(row)
  }

  return grid
}
