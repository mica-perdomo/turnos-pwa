import { useState, useCallback } from 'react'

export type SlideDirection = 'left' | 'right' | null

export function useCalendarMonth() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [slideDir, setSlideDir] = useState<SlideDirection>(null)

  const prevMonth = useCallback(() => {
    setSlideDir('right')
    setMonth((m) => {
      if (m === 0) {
        setYear((y) => y - 1)
        return 11
      }
      return m - 1
    })
  }, [])

  const nextMonth = useCallback(() => {
    setSlideDir('left')
    setMonth((m) => {
      if (m === 11) {
        setYear((y) => y + 1)
        return 0
      }
      return m + 1
    })
  }, [])

  const goToToday = useCallback(() => {
    const today = new Date()
    setSlideDir(null)
    setYear(today.getFullYear())
    setMonth(today.getMonth())
  }, [])

  const goTo = useCallback((y: number, m: number) => {
    setSlideDir(null)
    setYear(y)
    setMonth(m)
  }, [])

  const clearSlide = useCallback(() => setSlideDir(null), [])

  return { year, month, prevMonth, nextMonth, goToToday, goTo, slideDir, clearSlide } as const
}
