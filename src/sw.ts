/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching'

declare let self: ServiceWorkerGlobalScope

// Precache all Vite-built assets
precacheAndRoute(self.__WB_MANIFEST)

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      if (clients.length > 0) {
        clients[0].focus()
      } else {
        self.clients.openWindow('/')
      }
    }),
  )
})

// Listen for messages from the app to schedule notifications
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SCHEDULE_NOTIFICATION') {
    const { title, body, delay } = event.data
    setTimeout(() => {
      self.registration.showNotification(title, {
        body,
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
        tag: 'turno-reminder',
      } as NotificationOptions)
    }, delay)
  }
})
