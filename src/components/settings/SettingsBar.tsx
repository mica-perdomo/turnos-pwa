import { useState } from 'react'
import { ProductionSelector } from './ProductionSelector'
import { ThemeToggle } from './ThemeToggle'
import { Eye, EyeOff, BarChart3, RefreshCw, Loader2 } from 'lucide-react'
import type { ZoomSize } from '../../hooks/useZoom'

interface Props {
  production: number
  onProductionChange: (p: number) => void
  theme: 'dark' | 'light' | 'system'
  onThemeChange: (t: 'dark' | 'light' | 'system') => void
  showBanners: boolean
  onShowBannersChange: (v: boolean) => void
  showSummary: boolean
  onShowSummaryChange: (v: boolean) => void
  zoomSize: ZoomSize
  onZoomSizeChange: (v: ZoomSize) => void
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
      {children}
    </div>
  )
}

export function SettingsBar({
  production,
  onProductionChange,
  theme,
  onThemeChange,
  showBanners,
  onShowBannersChange,
  showSummary,
  onShowSummaryChange,
  zoomSize,
  onZoomSizeChange,
}: Props) {
  const [updating, setUpdating] = useState(false)
  const ZOOM_OPTIONS: { value: ZoomSize; label: string }[] = [
    { value: 'S', label: 'Chico' },
    { value: 'M', label: 'Normal' },
    { value: 'L', label: 'Grande' },
  ]
  return (
    <div className="space-y-4">
      {/* Production */}
      <div className="space-y-1.5">
        <SectionLabel>Producción</SectionLabel>
        <ProductionSelector production={production} onChange={onProductionChange} />
      </div>

      {/* Appearance */}
      <div className="space-y-1.5">
        <SectionLabel>Apariencia</SectionLabel>
        <div className="flex items-center gap-2 flex-wrap">
          <ThemeToggle theme={theme} onChange={onThemeChange} />
          <button
            type="button"
            onClick={() => onShowBannersChange(!showBanners)}
            className={`
              flex items-center gap-2 px-3 min-h-11 rounded-lg text-sm font-medium transition-all duration-150
              ${showBanners
                ? 'bg-indigo-600 text-white'
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'}
            `}
          >
            {showBanners ? <Eye size={16} /> : <EyeOff size={16} />}
            Hoy/Mañana
          </button>
          <button
            type="button"
            onClick={() => onShowSummaryChange(!showSummary)}
            className={`
              flex items-center gap-2 px-3 min-h-11 rounded-lg text-sm font-medium transition-all duration-150
              ${showSummary
                ? 'bg-indigo-600 text-white'
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'}
            `}
          >
            <BarChart3 size={16} />
            Resumen
          </button>
        </div>
      </div>

      {/* Update */}
      <div className="space-y-1.5">
        <SectionLabel>Actualizar · v{__APP_VERSION__}</SectionLabel>
        <button
          type="button"
          disabled={updating}
          onClick={() => {
            setUpdating(true)
            navigator.serviceWorker?.getRegistration().then((reg) => {
              reg?.update().then(() => window.location.reload())
            }) ?? window.location.reload()
          }}
          className="flex items-center gap-2 px-3 min-h-11 rounded-lg text-sm font-medium bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600 disabled:opacity-50 transition-all duration-150"
        >
          {updating
            ? <Loader2 size={16} className="animate-spin" />
            : <RefreshCw size={16} />
          }
          {updating ? 'Actualizando...' : 'Buscar actualización'}
        </button>
      </div>

      {/* Zoom */}
      <div className="space-y-1.5">
        <SectionLabel>Tamaño</SectionLabel>
        <div className="flex gap-2">
          {ZOOM_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onZoomSizeChange(opt.value)}
              className={`
                flex-1 min-h-11 rounded-lg text-sm font-medium transition-all duration-150
                ${zoomSize === opt.value
                  ? 'bg-indigo-600 text-white'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'}
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}
