import { PRODUCTION_COUNT } from '../../lib/constants'

interface Props {
  production: number
  onChange: (p: number) => void
}

export function ProductionSelector({ production, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: PRODUCTION_COUNT }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={`
            flex-1 min-h-[44px] rounded-lg font-bold text-sm
            transition-all duration-150
            ${
              p === production
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }
          `}
        >
          P{p}
        </button>
      ))}
    </div>
  )
}
