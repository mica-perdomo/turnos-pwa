import { PRODUCTION_COUNT } from '../../lib/constants'

interface Props {
  production: number
  onChange: (p: number) => void
}

export function ProductionSelector({ production, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
        Producción:
      </span>
      <div className="flex gap-1">
        {Array.from({ length: PRODUCTION_COUNT }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`
              min-w-[44px] min-h-[44px] rounded-lg font-bold text-sm
              transition-all duration-150
              ${
                p === production
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
              }
            `}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}
