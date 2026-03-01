import { useState, useCallback } from 'react'
import { getItem, setItem } from '../lib/storage'

const KEY = 'notifications_enabled'

export function useNotifications() {
  const [enabled, setEnabledState] = useState(() => getItem<boolean>(KEY, false))
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'denied',
  )

  const supported = typeof Notification !== 'undefined' && 'serviceWorker' in navigator

  const requestPermission = useCallback(async () => {
    if (!supported) return false
    const result = await Notification.requestPermission()
    setPermission(result)
    if (result === 'granted') {
      setEnabledState(true)
      setItem(KEY, true)
      return true
    }
    return false
  }, [supported])

  const toggle = useCallback(async () => {
    if (enabled) {
      setEnabledState(false)
      setItem(KEY, false)
    } else {
      await requestPermission()
    }
  }, [enabled, requestPermission])

  return { enabled, permission, supported, toggle } as const
}
