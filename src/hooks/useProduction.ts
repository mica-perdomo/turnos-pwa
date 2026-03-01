import { useState, useCallback } from 'react'
import { getItem, setItem } from '../lib/storage'

const KEY = 'production'

export function useProduction() {
  const [production, setProductionState] = useState(() => getItem<number>(KEY, 1))

  const setProduction = useCallback((p: number) => {
    setProductionState(p)
    setItem(KEY, p)
  }, [])

  return { production, setProduction } as const
}
