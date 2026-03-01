export const SHIFT_LABELS: Record<number, string> = {
  0: 'Franco',
  1: '1er Turno',
  2: '2do Turno',
  3: '3er Turno',
}

export const SHIFT_TIMES: Record<number, string> = {
  0: '',
  1: '06:00 - 14:00',
  2: '14:00 - 22:00',
  3: '22:00 - 06:00',
}

export const SHIFT_COLORS = {
  bg: {
    0: 'bg-zinc-400/15 dark:bg-zinc-500/35',
    1: 'bg-red-500/20 dark:bg-red-500/30',
    2: 'bg-green-500/20 dark:bg-green-500/30',
    3: 'bg-blue-500/20 dark:bg-blue-500/30',
  } as Record<number, string>,
  bgToday: {
    0: 'bg-zinc-400/30 dark:bg-zinc-500/50',
    1: 'bg-red-500/35 dark:bg-red-500/45',
    2: 'bg-green-500/35 dark:bg-green-500/45',
    3: 'bg-blue-500/35 dark:bg-blue-500/45',
  } as Record<number, string>,
  borderToday: {
    0: 'border-zinc-500 dark:border-zinc-300',
    1: 'border-red-500 dark:border-red-400',
    2: 'border-green-500 dark:border-green-400',
    3: 'border-blue-500 dark:border-blue-400',
  } as Record<number, string>,
  text: {
    0: 'text-zinc-500 dark:text-zinc-300',
    1: 'text-red-500 dark:text-red-400',
    2: 'text-green-500 dark:text-green-400',
    3: 'text-blue-500 dark:text-blue-400',
  } as Record<number, string>,
  dot: {
    0: 'bg-zinc-400',
    1: 'bg-red-500',
    2: 'bg-green-500',
    3: 'bg-blue-500',
  } as Record<number, string>,
}

export const MONTHS_ES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

export const DAYS_SHORT = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

export const PRODUCTION_COUNT = 4

export const PROD_COLORS = {
  bg: {
    1: 'bg-violet-600',
    2: 'bg-amber-500',
    3: 'bg-teal-500',
    4: 'bg-pink-500',
  } as Record<number, string>,
  text: {
    1: 'text-violet-600 dark:text-violet-400',
    2: 'text-amber-500 dark:text-amber-400',
    3: 'text-teal-500 dark:text-teal-400',
    4: 'text-pink-500 dark:text-pink-400',
  } as Record<number, string>,
}
