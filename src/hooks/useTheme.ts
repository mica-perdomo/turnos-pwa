import { useState, useEffect, useCallback } from 'react'
import { getItem, setItem } from '../lib/storage'

type Theme = 'dark' | 'light' | 'system'

const KEY = 'theme'

function applyTheme(theme: Theme) {
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', isDark)
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => getItem<Theme>(KEY, 'system'))

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    setItem(KEY, t)
    applyTheme(t)
  }, [])

  useEffect(() => {
    applyTheme(theme)

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => applyTheme('system')
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    }
  }, [theme])

  return { theme, setTheme } as const
}
