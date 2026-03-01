import { useState } from 'react'
import { X } from 'lucide-react'
import { MONTHS_ES } from '../../lib/constants'

interface Props {
  year: number
  month: number
  onSelect: (year: number, month: number) => void
  onClose: () => void
}

export function DatePicker({ year, month, onSelect, onClose }: Props) {
  const [selYear, setSelYear] = useState(year)

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-t-2xl sm:rounded-2xl p-5 pb-8 sm:pb-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Ir a fecha</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        {/* Year selector */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            type="button"
            onClick={() => setSelYear((y) => y - 1)}
            className="px-3 min-h-[44px] rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 font-bold transition-colors"
          >
            ‹
          </button>
          <span className="text-xl font-bold w-16 text-center">{selYear}</span>
          <button
            type="button"
            onClick={() => setSelYear((y) => y + 1)}
            className="px-3 min-h-[44px] rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 font-bold transition-colors"
          >
            ›
          </button>
        </div>

        {/* Month grid */}
        <div className="grid grid-cols-3 gap-2">
          {MONTHS_ES.map((name, i) => {
            const isCurrent = i === month && selYear === year
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  onSelect(selYear, i)
                  onClose()
                }}
                className={`
                  py-3 rounded-lg text-sm font-medium transition-all
                  min-h-[44px]
                  ${
                    isCurrent
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }
                `}
              >
                {name.slice(0, 3)}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
