import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MONTHS_ES } from '../../lib/constants'
import { DatePicker } from './DatePicker'

interface Props {
  year: number
  month: number
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  onGoTo: (year: number, month: number) => void
}

export function MonthNavigator({ year, month, onPrev, onNext, onGoTo }: Props) {
  const [showPicker, setShowPicker] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between py-3">
        <button
          type="button"
          onClick={onPrev}
          className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 active:bg-slate-400 dark:active:bg-slate-500 flex items-center justify-center transition-colors"
          aria-label="Mes anterior"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={() => setShowPicker(true)}
          className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <span className="text-lg font-bold">
            {MONTHS_ES[month]} {year}
          </span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 active:bg-slate-400 dark:active:bg-slate-500 flex items-center justify-center transition-colors"
          aria-label="Mes siguiente"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {showPicker && (
        <DatePicker
          year={year}
          month={month}
          onSelect={onGoTo}
          onClose={() => setShowPicker(false)}
        />
      )}
    </>
  )
}
