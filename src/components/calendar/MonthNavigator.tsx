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
      <div className="flex items-center justify-between px-2 py-3">
        <button
          type="button"
          onClick={onPrev}
          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 active:bg-slate-300 dark:active:bg-slate-600 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Mes anterior"
        >
          <ChevronLeft size={24} />
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
          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 active:bg-slate-300 dark:active:bg-slate-600 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Mes siguiente"
        >
          <ChevronRight size={24} />
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
