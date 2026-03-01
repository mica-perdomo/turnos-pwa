import { useState } from 'react'
import { ProductionSelector } from './ProductionSelector'
import { ThemeToggle } from './ThemeToggle'
import { NotificationSettings } from './NotificationSettings'
import { Bell, Send } from 'lucide-react'

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
    sendTest: (production: number) => Promise<{ title: string; body: string }>
  }
}

export function SettingsBar({
  production,
  onProductionChange,
  theme,
  onThemeChange,
  notifications,
}: Props) {
  const [preview, setPreview] = useState<{ title: string; body: string } | null>(null)

  const handleTest = async () => {
    const result = await notifications.sendTest(production)
    setPreview(result)
    setTimeout(() => setPreview(null), 4000)
  }

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
        <button
          type="button"
          onClick={handleTest}
          className="flex items-center gap-1.5 px-3 min-h-[44px] rounded-lg text-sm font-medium bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
          <Send size={14} />
          Probar
        </button>
      </div>

      {/* In-app notification preview (fallback when native notifications unavailable) */}
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
