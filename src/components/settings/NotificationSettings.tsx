import { Bell, BellOff, Send } from 'lucide-react'

interface Props {
  enabled: boolean
  supported: boolean
  permission: NotificationPermission
  onToggle: () => void
  onTest: () => void
}

export function NotificationSettings({ enabled, supported, permission, onToggle, onTest }: Props) {
  if (!supported) return null

  const denied = permission === 'denied'

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={denied ? undefined : onToggle}
        disabled={denied}
        className={`
          flex items-center gap-2 px-3 min-h-[44px] rounded-lg text-sm font-medium
          transition-all duration-150
          ${
            denied
              ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
              : enabled
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
          }
        `}
        title={denied ? 'Notificaciones bloqueadas en el navegador' : undefined}
      >
        {enabled ? <Bell size={16} /> : <BellOff size={16} />}
        <span className="hidden sm:inline">
          {denied ? 'Bloqueadas' : enabled ? 'Notif. activas' : 'Notificaciones'}
        </span>
      </button>
      {enabled && (
        <button
          type="button"
          onClick={onTest}
          className="flex items-center gap-1.5 px-3 min-h-[44px] rounded-lg text-sm font-medium bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
          <Send size={14} />
          Probar
        </button>
      )}
    </div>
  )
}
