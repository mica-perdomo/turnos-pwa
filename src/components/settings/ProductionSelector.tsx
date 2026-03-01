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
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
            }
          `}
        >
          P{p}
        </button>
      ))}
    </div>
  )
}
