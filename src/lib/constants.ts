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
    0: 'bg-gray-500/20 dark:bg-gray-600/20',
    1: 'bg-red-500/20 dark:bg-red-500/20',
    2: 'bg-green-500/20 dark:bg-green-500/20',
    3: 'bg-blue-500/20 dark:bg-blue-500/20',
  } as Record<number, string>,
  text: {
    0: 'text-gray-500 dark:text-gray-400',
    1: 'text-red-500 dark:text-red-400',
    2: 'text-green-500 dark:text-green-400',
    3: 'text-blue-500 dark:text-blue-400',
  } as Record<number, string>,
  dot: {
    0: 'bg-gray-400',
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
