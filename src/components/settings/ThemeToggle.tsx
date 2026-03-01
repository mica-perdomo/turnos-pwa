import { Sun, Moon, Monitor } from 'lucide-react'

type Theme = 'dark' | 'light' | 'system'

interface Props {
  theme: Theme
  onChange: (t: Theme) => void
}

const options: { value: Theme; icon: typeof Sun; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Claro' },
  { value: 'dark', icon: Moon, label: 'Oscuro' },
  { value: 'system', icon: Monitor, label: 'Auto' },
]

export function ThemeToggle({ theme, onChange }: Props) {
  return (
    <div className="flex gap-1">
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={`
            flex items-center gap-1.5 px-3 min-h-[44px] rounded-lg text-sm font-medium
            transition-all duration-150
            ${
              value === theme
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }
          `}
          aria-label={label}
        >
          <Icon size={16} />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  )
}
