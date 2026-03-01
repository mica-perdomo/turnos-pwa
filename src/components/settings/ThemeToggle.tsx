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
          flex items-center gap-1.5 px-3 min-h-11 rounded-lg text-sm font-medium
          transition-all duration-150
          ${
            theme === 'light'
              ? 'bg-indigo-600 text-white'
              : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
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
          flex items-center gap-1.5 px-3 min-h-11 rounded-lg text-sm font-medium
          transition-all duration-150
          ${
            theme === 'dark' || theme === 'system'
              ? 'bg-indigo-600 text-white'
              : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
          }
        `}
      >
        <Moon size={16} />
        <span>Oscuro</span>
      </button>
    </div>
  )
}
