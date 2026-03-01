import { useState, useCallback } from 'react'
import { getItem, setItem } from '../lib/storage'
import { getShift } from '../lib/shiftCycle'
import { getHolidaysForYear } from '../lib/holidays'
import { SHIFT_LABELS, SHIFT_TIMES } from '../lib/constants'

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

  const sendTest = useCallback(async (production: number) => {
    if (!supported) return
    if (Notification.permission !== 'granted') {
      const granted = await requestPermission()
      if (!granted) return
    }

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const shift = getShift(tomorrow, production)
    const holidays = getHolidaysForYear(tomorrow.getFullYear()).filter(
      (h) =>
        h.date.getMonth() === tomorrow.getMonth() &&
        h.date.getDate() === tomorrow.getDate(),
    )

    let body = `${SHIFT_LABELS[shift]}`
    if (SHIFT_TIMES[shift]) body += ` (${SHIFT_TIMES[shift]})`
    if (shift === 0) body += ' — Descansás'
    if (holidays.length > 0) {
      body += `\n🎉 ${holidays.map((h) => h.name).join(', ')}`
    }

    const reg = await navigator.serviceWorker.ready
    await reg.showNotification('Turno de mañana', {
      body,
      icon: '/turnos-pwa/icons/icon-192.png',
      badge: '/turnos-pwa/icons/icon-192.png',
      tag: 'turno-test',
    })
  }, [supported, requestPermission])

  return { enabled, permission, supported, toggle, sendTest } as const
}
