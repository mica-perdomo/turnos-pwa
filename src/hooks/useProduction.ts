import { useState, useCallback } from 'react'
import { getItem, setItem } from '../lib/storage'

const KEY = 'production'

export function useProduction() {
  const [production, setProductionState] = useState(() => getItem<number | null>(KEY, null))

  const setProduction = useCallback((p: number) => {
    setProductionState(p)
    setItem(KEY, p)
  }, [])

  const needsOnboarding = production === null

  return { production: production ?? 1, setProduction, needsOnboarding } as const
}
