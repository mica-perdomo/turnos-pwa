import { useState } from 'react'
import { ProductionSelector } from './ProductionSelector'
import { ThemeToggle } from './ThemeToggle'
import { NotificationSettings } from './NotificationSettings'
import { Bell, Send, Eye, EyeOff } from 'lucide-react'

interface Props {
  production: number
  onProductionChange: (p: number) => void
  theme: 'dark' | 'light' | 'system'
  onThemeChange: (t: 'dark' | 'light' | 'system') => void
  showBanners: boolean
  onShowBannersChange: (v: boolean) => void
  notifications: {
    enabled: boolean
    supported: boolean
    permission: NotificationPermission
    toggle: () => void
    sendTest: (production: number) => Promise<{ title: string; body: string }>
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
  notifications,
}: Props) {
  const [preview, setPreview] = useState<{ title: string; body: string } | null>(null)

  const handleTest = async () => {
    const result = await notifications.sendTest(production)
    setPreview(result)
    setTimeout(() => setPreview(null), 4000)
  }

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

      {/* Notifications */}
      <div className="space-y-1.5">
        <SectionLabel>Notificaciones</SectionLabel>
        <div className="flex items-center gap-2">
          <NotificationSettings
            enabled={notifications.enabled}
            supported={notifications.supported}
            permission={notifications.permission}
            onToggle={notifications.toggle}
          />
          <button
            type="button"
            onClick={handleTest}
            className="flex items-center gap-1.5 px-3 min-h-[44px] rounded-lg text-sm font-medium bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            <Send size={14} />
            Probar
          </button>
        </div>
      </div>

      {/* In-app notification preview */}
      {preview && (
        <div className="flex items-start gap-3 rounded-lg bg-indigo-600/10 dark:bg-indigo-500/20 border border-indigo-500/30 p-3 animate-slide-up">
          <Bell size={18} className="text-indigo-500 mt-0.5 shrink-0" />
          <div>
            <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
              {preview.title}
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line">
              {preview.body}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
