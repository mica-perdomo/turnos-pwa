import { useState, useEffect, useCallback } from 'react'
import { getItem, setItem } from '../lib/storage'

type Theme = 'dark' | 'light' | 'system'

const KEY = 'theme'

function resolveTheme(theme: Theme): 'dark' | 'light' {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return theme
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', resolveTheme(theme) === 'dark')
}

export function useTheme() {
  const [theme, setThemeState] = useState<'dark' | 'light'>(() => {
    const stored = getItem<Theme>(KEY, 'system')
    return resolveTheme(stored)
  })

  const setTheme = useCallback((t: 'dark' | 'light') => {
    setThemeState(t)
    setItem(KEY, t)
    applyTheme(t)
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return { theme, setTheme } as const
}
