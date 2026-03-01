import { useState, useEffect, useRef } from 'react'
import type { CalendarDay } from '../../lib/calendar'
import type { SlideDirection } from '../../hooks/useCalendarMonth'
import { CalendarHeader } from './CalendarHeader'
import { DayCell } from './DayCell'

function formatDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

interface Props {
  grid: CalendarDay[][]
  slideDir: SlideDirection
  onSlideEnd: () => void
  onDaySelect: (day: CalendarDay | null) => void
  selectedDay: CalendarDay | null
  notes: Record<string, string>
}

export function CalendarGrid({ grid, slideDir, onSlideEnd, onDaySelect, selectedDay, notes }: Props) {
  const [animClass, setAnimClass] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!slideDir) {
      setAnimClass('')
      return
    }
    setAnimClass(
      slideDir === 'left'
        ? 'tranneutral-x-[60px] opacity-0'
        : '-tranneutral-x-[60px] opacity-0',
    )
    const raf = requestAnimationFrame(() => {
      setAnimClass('tranneutral-x-0 opacity-100')
    })
    const timer = setTimeout(() => {
      setAnimClass('')
      onSlideEnd()
    }, 200)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [grid, slideDir, onSlideEnd])

  // Clear selection when month changes
  useEffect(() => {
    onDaySelect(null)
  }, [grid])

  const today = new Date()
  const todayStr = formatDateKey(today)

  return (
    <div>
      <CalendarHeader />
      <div
        ref={containerRef}
        className={`flex flex-col gap-1 transition-all duration-200 ease-out ${animClass}`}
      >
        {grid.map((row, rowIdx) => {
          const isCurrentWeek = row.some((day) => formatDateKey(day.date) === todayStr)
          return (
            <div
              key={rowIdx}
              className={`grid grid-cols-7 gap-1 ${
                isCurrentWeek ? '-mx-2 px-2 py-0.5 bg-black/20 dark:bg-white/10 rounded-xl' : ''
              }`}
            >
              {row.map((day) => (
                <DayCell
                  key={day.date.toISOString()}
                  day={day}
                  selected={
                    selectedDay !== null &&
                    day.date.getTime() === selectedDay.date.getTime()
                  }
                  onSelect={onDaySelect}
                  hasNote={!!notes[formatDateKey(day.date)]}
                />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
