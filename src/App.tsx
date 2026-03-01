import { useState } from 'react'
import { useProduction } from './hooks/useProduction'
import { useCalendarMonth } from './hooks/useCalendarMonth'
import { useShiftData } from './hooks/useShiftData'
import { useSwipe } from './hooks/useSwipe'
import { useTheme } from './hooks/useTheme'
import { useNotifications } from './hooks/useNotifications'

import { MonthNavigator } from './components/calendar/MonthNavigator'
import { CalendarGrid } from './components/calendar/CalendarGrid'
import { TodayBanner } from './components/info/TodayBanner'
import { MonthSummary } from './components/info/MonthSummary'
import { UpcomingHolidays } from './components/info/UpcomingHolidays'
import { SettingsBar } from './components/settings/SettingsBar'
import { Settings } from 'lucide-react'

export default function App() {
  const { production, setProduction } = useProduction()
  const { year, month, prevMonth, nextMonth, goToToday, goTo, slideDir, clearSlide } =
    useCalendarMonth()
  const { grid, todayInfo, tomorrowInfo, monthSummary } = useShiftData(year, month, production)
  const { theme, setTheme } = useTheme()
  const notifications = useNotifications()
  const swipeHandlers = useSwipe(nextMonth, prevMonth)
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div
      className="min-h-screen bg-white dark:bg-slate-900 transition-colors"
      {...swipeHandlers}
    >
      <div className="mx-auto max-w-md px-3 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between pt-4 pb-2">
          <h1 className="text-xl font-bold">Turnos</h1>
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
            aria-label="Configuración"
          >
            <Settings size={20} />
          </button>
        </div>

        {/* Settings panel */}
        {showSettings && (
          <div className="mb-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-200 dark:border-slate-700">
            <SettingsBar
              production={production}
              onProductionChange={setProduction}
              theme={theme}
              onThemeChange={setTheme}
              notifications={notifications}
            />
          </div>
        )}

        {/* Today + Tomorrow banners */}
        <div className="mb-4">
          <TodayBanner
            today={todayInfo}
            tomorrow={tomorrowInfo}
            production={production}
          />
        </div>

        {/* Month navigation */}
        <MonthNavigator
          year={year}
          month={month}
          onPrev={prevMonth}
          onNext={nextMonth}
          onToday={goToToday}
          onGoTo={goTo}
        />

        {/* Calendar */}
        <CalendarGrid
          grid={grid}
          production={production}
          slideDir={slideDir}
          onSlideEnd={clearSlide}
        />

        {/* Month summary */}
        <MonthSummary summary={monthSummary} />

        {/* Upcoming holidays */}
        <div className="mt-4">
          <UpcomingHolidays production={production} />
        </div>
      </div>
    </div>
  )
}
