/**
 * Shift cycle logic — ported exactly from the APK (Turnos.java).
 *
 * The cycle is 108 days long.  Values: 1 = 1er turno, 2 = 2do, 3 = 3er, 0 = franco.
 *
 * Each production has an epoch offset so that
 *   index = (OFFSET[prod] + epochDay) % 108
 * where epochDay = UTC-millis / 86400000.
 *
 * Equivalently, each production has a "start date" (index 0 of the cycle):
 *   Prod 1 → 2001-10-07,  Prod 2 → 2001-11-03,
 *   Prod 3 → 2001-11-30,  Prod 4 → 2001-12-27
 */

export const CYCLE: readonly number[] = [
  1, 1, 1, 1, 1, 0, 0,
  3, 3, 3, 3, 3, 0, 0,
  2, 2, 2, 2, 2, 0, 0,
  1, 1, 1, 1, 1, 1, 0,
  0, 3, 3, 3, 3, 3, 0,
  0, 2, 2, 2, 2, 2, 0,
  0, 1, 1, 1, 1, 1, 0,
  0, 3, 3, 3, 3, 3, 3,
  0, 0, 2, 2, 2, 2, 2,
  0, 0, 1, 1, 1, 1, 1,
  0, 0, 3, 3, 3, 3, 3,
  0, 0, 2, 2, 2, 2, 2,
  2, 0, 1, 1, 1, 1, 1,
  1, 0, 3, 3, 3, 3, 3,
  3, 0, 2, 2, 2, 2, 2,
  2, 0, 0,
]

/** APK epoch-day offsets per production (from Turnos.java) */
const EPOCH_OFFSET: Record<number, number> = {
  1: 62,
  2: 35,
  3: 8,
  4: 89,
}

const MS_PER_DAY = 86_400_000

/** Convert a local date to its UTC epoch-day number (matching the APK's arithmetic). */
function toEpochDay(date: Date): number {
  const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  return Math.floor(utc / MS_PER_DAY)
}

/** Get the cycle index (0-107) for a date + production. */
export function getCycleIndex(date: Date, production: number): number {
  const day = toEpochDay(date)
  const offset = EPOCH_OFFSET[production] ?? EPOCH_OFFSET[1]
  return ((offset + day) % 108 + 108) % 108
}

/** Get the shift value (0|1|2|3) for a date + production. */
export function getShift(date: Date, production: number): number {
  return CYCLE[getCycleIndex(date, production)]
}

/** Get shifts for all 4 productions on a given date. */
export function getAllShifts(date: Date): [number, number, number, number] {
  return [
    getShift(date, 1),
    getShift(date, 2),
    getShift(date, 3),
    getShift(date, 4),
  ]
}
