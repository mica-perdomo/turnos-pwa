import { useState, useEffect, useCallback } from 'react'
import { getItem, setItem } from '../lib/storage'

const KEY = 'zoom'
const STEPS = [85, 100, 115, 130]
const DEFAULT = 100

export function useZoom() {
  const [zoom, setZoomState] = useState<number>(() => getItem<number>(KEY, DEFAULT))

  const setZoom = useCallback((value: number) => {
    setZoomState(value)
    setItem(KEY, value)
  }, [])

  // Clean up any leftover font-size from previous implementation
  useEffect(() => {
    document.documentElement.style.fontSize = ''
  }, [])

  return { zoom, setZoom, steps: STEPS } as const
}
