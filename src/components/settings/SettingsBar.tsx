import { ProductionSelector } from './ProductionSelector'
import { ThemeToggle } from './ThemeToggle'
import { NotificationSettings } from './NotificationSettings'
import { SHIFT_COLORS } from '../../lib/constants'

interface Props {
  production: number
  onProductionChange: (p: number) => void
  theme: 'dark' | 'light' | 'system'
  onThemeChange: (t: 'dark' | 'light' | 'system') => void
  notifications: {
    enabled: boolean
    supported: boolean
    permission: NotificationPermission
    toggle: () => void
  }
}

export function SettingsBar({
  production,
  onProductionChange,
  theme,
  onThemeChange,
  notifications,
}: Props) {
  return (
    <div className="space-y-3">
      <ProductionSelector production={production} onChange={onProductionChange} />
      <div className="flex items-center gap-2 flex-wrap">
        <ThemeToggle theme={theme} onChange={onThemeChange} />
        <NotificationSettings
          enabled={notifications.enabled}
          supported={notifications.supported}
          permission={notifications.permission}
          onToggle={notifications.toggle}
        />
      </div>
      {/* Legend */}
      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1">
          <span className={`h-2.5 w-2.5 rounded-full ${SHIFT_COLORS.dot[1]}`} />
          <span>1er</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={`h-2.5 w-2.5 rounded-full ${SHIFT_COLORS.dot[2]}`} />
          <span>2do</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={`h-2.5 w-2.5 rounded-full ${SHIFT_COLORS.dot[3]}`} />
          <span>3er</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={`h-2.5 w-2.5 rounded-full ${SHIFT_COLORS.dot[0]}`} />
          <span>Franco</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded border-2 border-amber-400" />
          <span>Feriado</span>
        </div>
      </div>
    </div>
  )
}
