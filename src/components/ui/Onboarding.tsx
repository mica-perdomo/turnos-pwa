import { PRODUCTION_COUNT } from '../../lib/constants'

interface Props {
  onSelect: (p: number) => void
}

export function Onboarding({ onSelect }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 px-6">
      <div className="w-full max-w-xs text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Turnos</h1>
        <p className="text-slate-400 mb-8">
          Seleccioná tu producción para empezar
        </p>
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: PRODUCTION_COUNT }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onSelect(p)}
              className="py-5 rounded-xl bg-slate-800 border-2 border-slate-700 text-white text-lg font-bold hover:border-indigo-500 hover:bg-slate-700 active:bg-indigo-600 transition-all min-h-[44px]"
            >
              Producción {p}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-6">
          Podés cambiarlo después en configuración
        </p>
      </div>
    </div>
  )
}
