import { useState, useEffect, useCallback } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
}

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as any).standalone === true
  )
}

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showIOSGuide, setShowIOSGuide] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // Already installed — don't show anything
  const installed = isStandalone()

  useEffect(() => {
    if (installed) return

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', handler)

    // On iOS, show guide after a short delay (only first time)
    if (isIOS()) {
      const key = 'turnos_ios_install_shown'
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, '1')
        setShowIOSGuide(true)
      }
    }

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [installed])

  const install = useCallback(async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
    }
  }, [deferredPrompt])

  const dismiss = useCallback(() => {
    setDismissed(true)
    setShowIOSGuide(false)
  }, [])

  const canPrompt = deferredPrompt !== null
  const visible = !installed && !dismissed && (canPrompt || showIOSGuide)

  return { visible, canPrompt, showIOSGuide, install, dismiss } as const
}
