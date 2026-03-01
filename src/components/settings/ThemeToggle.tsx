import { Sun, Moon } from 'lucide-react'

type Theme = 'dark' | 'light' | 'system'

interface Props {
  theme: Theme
  onChange: (t: Theme) => void
}

export function ThemeToggle({ theme, onChange }: Props) {
  return (
    <div className="flex gap-1">
      <button
        type="button"
        onClick={() => onChange('light')}
        className={`
          flex items-center gap-1.5 px-3 min-h-[44px] rounded-lg text-sm font-medium
          transition-all duration-150
          ${
            theme === 'light'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
          }
        `}
      >
        <Sun size={16} />
        <span>Claro</span>
      </button>
      <button
        type="button"
        onClick={() => onChange('dark')}
        className={`
          flex items-center gap-1.5 px-3 min-h-[44px] rounded-lg text-sm font-medium
          transition-all duration-150
          ${
            theme === 'dark' || theme === 'system'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
          }
        `}
      >
        <Moon size={16} />
        <span>Oscuro</span>
      </button>
    </div>
  )
}
