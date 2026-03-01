import { ProductionSelector } from './ProductionSelector'
import { ThemeToggle } from './ThemeToggle'
import { NotificationSettings } from './NotificationSettings'
import { Eye, EyeOff, Minus, Plus } from 'lucide-react'

interface Props {
  production: number
  onProductionChange: (p: number) => void
  theme: 'dark' | 'light' | 'system'
  onThemeChange: (t: 'dark' | 'light' | 'system') => void
  showBanners: boolean
  onShowBannersChange: (v: boolean) => void
  zoom: number
  zoomSteps: number[]
  onZoomChange: (v: number) => void
  notifications: {
    enabled: boolean
    supported: boolean
    permission: NotificationPermission
    toggle: () => void
  }
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
      {children}
    </div>
  )
}

export function SettingsBar({
  production,
  onProductionChange,
  theme,
  onThemeChange,
  showBanners,
  onShowBannersChange,
  zoom,
  zoomSteps,
  onZoomChange,
  notifications,
}: Props) {
  return (
    <div className="space-y-4">
      {/* Production */}
      <div className="space-y-1.5">
        <SectionLabel>Producción</SectionLabel>
        <ProductionSelector production={production} onChange={onProductionChange} />
      </div>

      {/* Appearance */}
      <div className="space-y-1.5">
        <SectionLabel>Apariencia</SectionLabel>
        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onChange={onThemeChange} />
          <button
            type="button"
            onClick={() => onShowBannersChange(!showBanners)}
            className={`
              flex items-center gap-2 px-3 min-h-[44px] rounded-lg text-sm font-medium transition-all duration-150
              ${showBanners
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'}
            `}
          >
            {showBanners ? <Eye size={16} /> : <EyeOff size={16} />}
            Hoy/Mañana
          </button>
        </div>
      </div>

      {/* Zoom */}
      <div className="space-y-1.5">
        <SectionLabel>Tamaño</SectionLabel>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={zoom <= zoomSteps[0]}
            onClick={() => {
              const idx = zoomSteps.indexOf(zoom)
              if (idx > 0) onZoomChange(zoomSteps[idx - 1])
            }}
            className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-30 flex items-center justify-center transition-colors"
            aria-label="Reducir tamaño"
          >
            <Minus size={16} />
          </button>
          <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
          <button
            type="button"
            disabled={zoom >= zoomSteps[zoomSteps.length - 1]}
            onClick={() => {
              const idx = zoomSteps.indexOf(zoom)
              if (idx < zoomSteps.length - 1) onZoomChange(zoomSteps[idx + 1])
            }}
            className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-30 flex items-center justify-center transition-colors"
            aria-label="Aumentar tamaño"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="space-y-1.5">
        <SectionLabel>Notificaciones</SectionLabel>
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
