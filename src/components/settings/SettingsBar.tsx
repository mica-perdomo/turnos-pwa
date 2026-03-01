import { ProductionSelector } from './ProductionSelector'
import { ThemeToggle } from './ThemeToggle'
import { NotificationSettings } from './NotificationSettings'

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
    </div>
  )
}
