import { useMemo } from 'react'
import { buildCalendarGrid, type CalendarDay } from '../lib/calendar'
import { getShift } from '../lib/shiftCycle'
import { getRelief, type ReliefInfo } from '../lib/relief'
import { isHoliday, type Holiday } from '../lib/holidays'

export interface DayInfo {
  shift: number
  relief: ReliefInfo
  holiday: Holiday | undefined
}

export interface MonthSummary {
  shifts: [number, number, number, number] // count of franco, 1er, 2do, 3er
  total: number
}

export function useShiftData(year: number, month: number, production: number) {
  const grid = useMemo(
    () => buildCalendarGrid(year, month, production),
    [year, month, production],
  )

  const todayInfo = useMemo((): DayInfo => {
    const today = new Date()
    return {
      shift: getShift(today, production),
      relief: getRelief(today, production),
      holiday: isHoliday(today),
    }
  }, [production])

  const tomorrowInfo = useMemo((): DayInfo => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return {
      shift: getShift(tomorrow, production),
      relief: getRelief(tomorrow, production),
      holiday: isHoliday(tomorrow),
    }
  }, [production])

  const monthSummary = useMemo((): MonthSummary => {
    const counts: [number, number, number, number] = [0, 0, 0, 0]
    let total = 0
    for (const week of grid) {
      for (const day of week) {
        if (day.isCurrentMonth) {
          counts[day.shift]++
          total++
        }
      }
    }
    return { shifts: counts, total }
  }, [grid])

  return { grid, todayInfo, tomorrowInfo, monthSummary } as const
}

export type { CalendarDay }
