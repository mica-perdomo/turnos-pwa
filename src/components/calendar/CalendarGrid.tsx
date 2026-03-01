import { useState, useEffect, useRef } from 'react'
import type { CalendarDay } from '../../lib/calendar'
import type { SlideDirection } from '../../hooks/useCalendarMonth'
import { CalendarHeader } from './CalendarHeader'
import { DayCell } from './DayCell'
import { DayDetail } from '../info/DayDetail'

interface Props {
  grid: CalendarDay[][]
  production: number
  slideDir: SlideDirection
  onSlideEnd: () => void
}

export function CalendarGrid({ grid, production, slideDir, onSlideEnd }: Props) {
  const [selected, setSelected] = useState<CalendarDay | null>(null)
  const [animClass, setAnimClass] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!slideDir) {
      setAnimClass('')
      return
    }
    // Start off-screen
    setAnimClass(
      slideDir === 'left'
        ? 'translate-x-[60px] opacity-0'
        : '-translate-x-[60px] opacity-0',
    )
    // Slide in on next frame
    const raf = requestAnimationFrame(() => {
      setAnimClass('translate-x-0 opacity-100')
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
    setSelected(null)
  }, [grid])

  return (
    <div>
      <CalendarHeader />
      <div
        ref={containerRef}
        className={`grid grid-cols-7 gap-1 transition-all duration-200 ease-out ${animClass}`}
      >
        {grid.flat().map((day) => (
          <DayCell
            key={day.date.toISOString()}
            day={day}
            selected={
              selected !== null &&
              day.date.getTime() === selected.date.getTime()
            }
            onSelect={setSelected}
          />
        ))}
      </div>
      {selected && (
        <DayDetail
          day={selected}
          production={production}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}
