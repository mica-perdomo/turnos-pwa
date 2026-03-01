import { ProductionSelector } from './ProductionSelector'
import { ThemeToggle } from './ThemeToggle'
import { Eye, EyeOff, Minus, Plus, BarChart3 } from 'lucide-react'

interface Props {
  production: number
  onProductionChange: (p: number) => void
  theme: 'dark' | 'light' | 'system'
  onThemeChange: (t: 'dark' | 'light' | 'system') => void
  showBanners: boolean
  onShowBannersChange: (v: boolean) => void
  showSummary: boolean
  onShowSummaryChange: (v: boolean) => void
  zoom: number
  zoomSteps: number[]
  onZoomChange: (v: number) => void
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
  zoom,
  zoomSteps,
  onZoomChange,
}: Props) {
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
              flex items-center gap-2 px-3 min-h-[44px] rounded-lg text-sm font-medium transition-all duration-150
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
              flex items-center gap-2 px-3 min-h-[44px] rounded-lg text-sm font-medium transition-all duration-150
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

      {/* Zoom */}
      <div className="space-y-1.5">
        <SectionLabel>Tamaño</SectionLabel>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={zoom <= zoomSteps[0]}
            onClick={() => {
              const idx = zoomSteps.indexOf(zoom)
              if (idx > 0) onZoomChange(zoomSteps[idx - 1])
            }}
            className="w-10 h-10 rounded-lg bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 disabled:opacity-30 flex items-center justify-center transition-colors"
            aria-label="Reducir tamaño"
          >
            <Minus size={16} />
          </button>
          <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
          <button
            type="button"
            disabled={zoom >= zoomSteps[zoomSteps.length - 1]}
            onClick={() => {
              const idx = zoomSteps.indexOf(zoom)
              if (idx < zoomSteps.length - 1) onZoomChange(zoomSteps[idx + 1])
            }}
            className="w-10 h-10 rounded-lg bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 disabled:opacity-30 flex items-center justify-center transition-colors"
            aria-label="Aumentar tamaño"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
