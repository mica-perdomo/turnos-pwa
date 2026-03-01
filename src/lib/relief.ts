/**
 * Relief (relevo) calculation — ported from APK (ImageAdapter.java).
 *
 * - Shift 1 relieves whoever had shift 3 YESTERDAY
 * - Shift 2 relieves whoever has shift 1 TODAY
 * - Shift 3 relieves whoever has shift 2 TODAY
 */

import { getShift } from './shiftCycle'

/** Find which production has a given shift on a given date. Returns 0 if none. */
function findProductionWithShift(date: Date, targetShift: number): number {
  for (let prod = 1; prod <= 4; prod++) {
    if (getShift(date, prod) === targetShift) return prod
  }
  return 0
}

function yesterday(date: Date): Date {
  const d = new Date(date)
  d.setDate(d.getDate() - 1)
  return d
}

function tomorrow(date: Date): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + 1)
  return d
}

export interface ReliefInfo {
  relievesProduction: number // who this production relieves
  relievedByProduction: number // who relieves this production
}

/** Get relief info for a production on a given date. */
export function getRelief(date: Date, production: number): ReliefInfo {
  const shift = getShift(date, production)

  let relievesProduction = 0
  let relievedByProduction = 0

  switch (shift) {
    case 1:
      // Shift 1 relieves whoever had shift 3 yesterday
      relievesProduction = findProductionWithShift(yesterday(date), 3)
      // Shift 1 is relieved by whoever has shift 2 today
      relievedByProduction = findProductionWithShift(date, 2)
      break
    case 2:
      // Shift 2 relieves whoever has shift 1 today
      relievesProduction = findProductionWithShift(date, 1)
      // Shift 2 is relieved by whoever has shift 3 today
      relievedByProduction = findProductionWithShift(date, 3)
      break
    case 3:
      // Shift 3 relieves whoever has shift 2 today
      relievesProduction = findProductionWithShift(date, 2)
      // Shift 3 is relieved by whoever has shift 1 tomorrow
      relievedByProduction = findProductionWithShift(tomorrow(date), 1)
      break
    default:
      // Franco — no relief
      break
  }

  return { relievesProduction, relievedByProduction }
}
