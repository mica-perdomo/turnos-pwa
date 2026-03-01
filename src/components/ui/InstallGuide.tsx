import { Download, Share, MoreVertical, ArrowRight } from 'lucide-react'

interface Props {
  canPrompt: boolean
  isIOS: boolean
  onInstall: () => void
  onSkip: () => void
}

export function InstallGuide({ canPrompt, isIOS, onInstall, onSkip }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900 px-6">
      <div className="w-full max-w-xs text-center">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-2xl bg-neutral-800 border-2 border-neutral-700 flex items-center justify-center">
            <img src={`${import.meta.env.BASE_URL}icons/icon-192.png`} alt="Turnos" className="w-14 h-14 rounded-xl" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Instalar Turnos</h1>
        <p className="text-sm text-neutral-400 mb-8">
          Instalá la app en tu celular para acceder rápido y usarla sin internet.
        </p>

        {canPrompt ? (
          /* Android / Chrome — direct install */
          <div className="space-y-3">
            <button
              type="button"
              onClick={onInstall}
              className="w-full py-4 rounded-xl bg-indigo-600 text-white text-base font-bold hover:bg-indigo-700 active:bg-indigo-800 transition-colors flex items-center justify-center gap-2 min-h-11"
            >
              <Download size={20} />
              Instalar app
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="w-full py-3 text-sm text-neutral-400 hover:text-neutral-300 transition-colors"
            >
              Ahora no, seguir en el navegador
            </button>
          </div>
        ) : isIOS ? (
          /* iOS — manual steps */
          <div className="space-y-5">
            <div className="rounded-xl bg-neutral-800 border border-neutral-700 p-4 text-left space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</div>
                <p className="text-sm text-neutral-300">
                  Tocá el botón <Share size={14} className="inline -mt-0.5 text-indigo-400" /> <span className="font-semibold text-white">Compartir</span> en la barra de Safari
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</div>
                <p className="text-sm text-neutral-300">
                  Buscá y tocá <span className="font-semibold text-white">Agregar a pantalla de inicio</span>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</div>
                <p className="text-sm text-neutral-300">
                  Tocá <span className="font-semibold text-white">Agregar</span> y listo
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onSkip}
              className="w-full py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-sm font-semibold hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2 min-h-11"
            >
              Ya la instalé
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="w-full py-3 text-sm text-neutral-400 hover:text-neutral-300 transition-colors"
            >
              Ahora no, seguir en el navegador
            </button>
          </div>
        ) : (
          /* Other browsers — generic guide */
          <div className="space-y-5">
            <div className="rounded-xl bg-neutral-800 border border-neutral-700 p-4 text-left space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</div>
                <p className="text-sm text-neutral-300">
                  Abrí el menú del navegador <MoreVertical size={14} className="inline -mt-0.5 text-indigo-400" />
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</div>
                <p className="text-sm text-neutral-300">
                  Tocá <span className="font-semibold text-white">Instalar app</span> o <span className="font-semibold text-white">Agregar a pantalla de inicio</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onSkip}
              className="w-full py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-sm font-semibold hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2 min-h-11"
            >
              Continuar
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
