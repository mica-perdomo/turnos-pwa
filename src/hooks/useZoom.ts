import { useState, useEffect, useCallback } from 'react'
import { getItem, setItem } from '../lib/storage'

const KEY = 'zoom'

export type ZoomSize = 'S' | 'M' | 'L'

const FONT_SIZES: Record<ZoomSize, number> = {
  S: 14,
  M: 16,
  L: 18,
}

export function useZoom() {
  const [size, setSizeState] = useState<ZoomSize>(() => getItem<ZoomSize>(KEY, 'M'))

  const setSize = useCallback((value: ZoomSize) => {
    setSizeState(value)
    setItem(KEY, value)
  }, [])

  useEffect(() => {
    document.documentElement.style.fontSize = `${FONT_SIZES[size]}px`
    return () => { document.documentElement.style.fontSize = '' }
  }, [size])

  return { size, setSize } as const
}
