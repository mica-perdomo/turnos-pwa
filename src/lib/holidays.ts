/**
 * Uruguayan holidays — ported from the APK (Turnos.java).
 *
 * Fixed holidays that fall on Tue→Mon before, Wed→Mon before, Thu→Mon after, Fri→Mon after.
 * Carnival = Easter − 48 (Monday) and Easter − 47 (Tuesday).
 * Semana de Turismo = week before Easter (Mon–Sun, 7 days).
 */

export interface Holiday {
  date: Date
  name: string
  moved?: boolean
}

/** Computus — Anonymous Gregorian algorithm (matches APK). Returns Easter Sunday. */
function computeEaster(year: number): Date {
  const A = year % 19
  const B = year % 4
  const C = year % 7
  const D = (19 * A + 24) % 30
  const E = (2 * B + 4 * C + 6 * D + 5) % 7
  const N = D + 22 + E
  if (N <= 31) {
    return new Date(year, 2, N) // March
  }
  return new Date(year, 3, N - 31) // April
}

/**
 * Move a fixed holiday to Monday if it falls on Tue/Wed (→ prev Mon) or Thu/Fri (→ next Mon).
 * Sat/Sun/Mon stay as-is (matching APK behavior).
 */
function moveToMonday(date: Date): { date: Date; moved: boolean } {
  const dow = date.getDay() // 0=Sun .. 6=Sat
  let offset = 0
  switch (dow) {
    case 2: offset = -1; break // Tue → Mon before
    case 3: offset = -2; break // Wed → Mon before
    case 4: offset = 4; break  // Thu → Mon after
    case 5: offset = 3; break  // Fri → Mon after
  }
  if (offset === 0) return { date, moved: false }
  const moved = new Date(date)
  moved.setDate(moved.getDate() + offset)
  return { date: moved, moved: true }
}

/** Get all holidays for a given year. */
export function getHolidaysForYear(year: number): Holiday[] {
  const holidays: Holiday[] = []

  // --- Fixed holidays (no movement) ---
  holidays.push({ date: new Date(year, 0, 1), name: 'Año Nuevo' })
  holidays.push({ date: new Date(year, 0, 6), name: 'Día de los Niños' })
  holidays.push({ date: new Date(year, 4, 1), name: 'Día del Trabajador' })
  holidays.push({ date: new Date(year, 5, 19), name: 'Natalicio de Artigas' })
  holidays.push({ date: new Date(year, 6, 18), name: 'Jura de la Constitución' })
  holidays.push({ date: new Date(year, 7, 25), name: 'Declaratoria de la Independencia' })
  holidays.push({ date: new Date(year, 11, 25), name: 'Navidad' })

  // --- Fixed holidays WITH movement ---
  const movable: [number, number, string][] = [
    [3, 19, 'Desembarco de los 33 Orientales'],
    [4, 18, 'Batalla de las Piedras'],
    [9, 12, 'Día de la Diversidad Cultural'],
    [10, 2, 'Día de los Difuntos'],
  ]
  for (const [month, day, name] of movable) {
    const result = moveToMonday(new Date(year, month, day))
    holidays.push({ date: result.date, name, moved: result.moved })
  }

  // --- Easter-based holidays ---
  const easter = computeEaster(year)

  // Carnival: Easter − 48 (Mon) and Easter − 47 (Tue)
  const carnivalMon = new Date(easter)
  carnivalMon.setDate(carnivalMon.getDate() - 48)
  holidays.push({ date: carnivalMon, name: 'Carnaval' })

  const carnivalTue = new Date(easter)
  carnivalTue.setDate(carnivalTue.getDate() - 47)
  holidays.push({ date: carnivalTue, name: 'Carnaval' })

  // Semana de Turismo: Monday to Sunday before Easter (7 days)
  for (let i = 6; i >= 0; i--) {
    const d = new Date(easter)
    d.setDate(d.getDate() - i)
    // Only add the weekdays (Mon=6 days before through Fri=2 days before)
    // Actually, the APK marks the full 7 days
    holidays.push({ date: d, name: 'Semana de Turismo' })
  }

  return holidays
}

/** Get holidays for a specific month. Returns a Map<dayOfMonth, Holiday[]>. */
export function getHolidaysForMonth(
  year: number,
  month: number,
): Map<number, Holiday[]> {
  const map = new Map<number, Holiday[]>()
  const all = getHolidaysForYear(year)
  for (const h of all) {
    if (h.date.getFullYear() === year && h.date.getMonth() === month) {
      const day = h.date.getDate()
      const existing = map.get(day) ?? []
      existing.push(h)
      map.set(day, existing)
    }
  }
  return map
}

/** Check if a specific date is a holiday. */
export function isHoliday(date: Date): Holiday | undefined {
  const holidays = getHolidaysForYear(date.getFullYear())
  return holidays.find(
    (h) =>
      h.date.getFullYear() === date.getFullYear() &&
      h.date.getMonth() === date.getMonth() &&
      h.date.getDate() === date.getDate(),
  )
}

/** Get upcoming holidays (deduplicated by date, e.g. Semana de Turismo as one entry). */
export function getUpcomingHolidays(count: number): Holiday[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const thisYear = getHolidaysForYear(today.getFullYear())
  const nextYear = getHolidaysForYear(today.getFullYear() + 1)
  const all = [...thisYear, ...nextYear]

  // Deduplicate: group by name + keep only the first date of multi-day holidays
  const seen = new Map<string, Holiday>()
  for (const h of all) {
    if (h.date < today) continue
    const key = `${h.name}-${h.date.getFullYear()}`
    if (!seen.has(key) || h.date < seen.get(key)!.date) {
      seen.set(key, h)
    }
  }

  return [...seen.values()]
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, count)
}
