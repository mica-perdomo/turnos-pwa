import { Bell, BellOff } from 'lucide-react'

interface Props {
  enabled: boolean
  supported: boolean
  permission: NotificationPermission
  onToggle: () => void
}

export function NotificationSettings({ enabled, supported, permission, onToggle }: Props) {
  if (!supported) return null

  const denied = permission === 'denied'

  return (
    <button
      type="button"
      onClick={denied ? undefined : onToggle}
      disabled={denied}
      className={`
        flex items-center gap-2 px-3 min-h-[44px] rounded-lg text-sm font-medium
        transition-all duration-150
        ${
          denied
            ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400 cursor-not-allowed'
            : enabled
              ? 'bg-indigo-600 text-white'
              : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
        }
      `}
      title={denied ? 'Notificaciones bloqueadas en el navegador' : undefined}
    >
      {enabled ? <Bell size={16} /> : <BellOff size={16} />}
      <span className="hidden sm:inline">
        {denied ? 'Bloqueadas' : enabled ? 'Notif. activas' : 'Notificaciones'}
      </span>
    </button>
  )
}
