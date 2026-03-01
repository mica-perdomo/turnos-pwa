import { Download, X, Share } from 'lucide-react'

interface Props {
  canPrompt: boolean
  showIOSGuide: boolean
  onInstall: () => void
  onDismiss: () => void
}

export function InstallBanner({ canPrompt, showIOSGuide, onInstall, onDismiss }: Props) {
  return (
    <div className="rounded-xl border border-indigo-400/30 bg-indigo-500/10 dark:bg-indigo-500/10 px-3 py-2.5 mb-4">
      <div className="flex items-center gap-3">
        <Download size={18} className="text-indigo-500 dark:text-indigo-400 shrink-0" />

        <div className="flex-1 min-w-0">
          {canPrompt ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Instalar Turnos
              </span>
              <button
                type="button"
                onClick={onInstall}
                className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors"
              >
                Instalar
              </button>
            </div>
          ) : showIOSGuide ? (
            <div className="text-sm text-slate-700 dark:text-slate-200">
              <span>Tocá </span>
              <Share size={14} className="inline -mt-0.5 text-indigo-500" />
              <span className="font-medium"> Compartir</span>
              <span> → </span>
              <span className="font-medium">Agregar a inicio</span>
            </div>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shrink-0"
          aria-label="Cerrar"
        >
          <X size={16} className="text-slate-400" />
        </button>
      </div>
    </div>
  )
}
