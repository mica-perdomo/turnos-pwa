import { useState, useCallback } from 'react'
import { useProduction } from './hooks/useProduction'
import { useCalendarMonth } from './hooks/useCalendarMonth'
import { useShiftData, type CalendarDay } from './hooks/useShiftData'
import { useSwipe } from './hooks/useSwipe'
import { useTheme } from './hooks/useTheme'
import { useNotifications } from './hooks/useNotifications'
import { useInstallPrompt } from './hooks/useInstallPrompt'

import { MonthNavigator } from './components/calendar/MonthNavigator'
import { CalendarGrid } from './components/calendar/CalendarGrid'
import { TodayBanner } from './components/info/TodayBanner'
import { MonthSummary } from './components/info/MonthSummary'
import { UpcomingHolidays } from './components/info/UpcomingHolidays'
import { DayDetail } from './components/info/DayDetail'
import { SettingsBar } from './components/settings/SettingsBar'
import { InstallBanner } from './components/ui/InstallBanner'
import { Onboarding } from './components/ui/Onboarding'
import { Settings, CalendarDays } from 'lucide-react'

export default function App() {
  const { production, setProduction, needsOnboarding } = useProduction()
  const { year, month, prevMonth, nextMonth, goToToday, goTo, slideDir, clearSlide } =
    useCalendarMonth()
  const { grid, todayInfo, tomorrowInfo, monthSummary } = useShiftData(year, month, production)
  const { theme, setTheme } = useTheme()
  const notifications = useNotifications()
  const installPrompt = useInstallPrompt()
  const swipeHandlers = useSwipe(nextMonth, prevMonth)
  const [showSettings, setShowSettings] = useState(false)
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null)
  const [showBanners, setShowBanners] = useState(() => {
    try {
      const v = localStorage.getItem('turnos_show_banners')
      return v === null ? true : JSON.parse(v)
    } catch { return true }
  })
  const handleShowBanners = useCallback((v: boolean) => {
    setShowBanners(v)
    localStorage.setItem('turnos_show_banners', JSON.stringify(v))
  }, [])

  const now = new Date()
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth()

  if (needsOnboarding) {
    return <Onboarding onSelect={setProduction} />
  }

  return (
    <div
      className="min-h-screen bg-white dark:bg-slate-900 transition-colors"
      {...swipeHandlers}
    >
      <div className="mx-auto max-w-md px-3 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between pt-[env(safe-area-inset-top,16px)] pb-2">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold">Turnos</h1>
            <span className="px-3 py-1 rounded-full bg-violet-600 text-white text-xs">
              Producción {production}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 active:bg-slate-400 dark:active:bg-slate-500 flex items-center justify-center transition-colors"
            aria-label="Configuración"
          >
            <Settings size={22} />
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
              showBanners={showBanners}
              onShowBannersChange={handleShowBanners}
              notifications={notifications}
            />
          </div>
        )}

        {/* Install banner */}
        {installPrompt.visible && (
          <InstallBanner
            canPrompt={installPrompt.canPrompt}
            showIOSGuide={installPrompt.showIOSGuide}
            onInstall={installPrompt.install}
            onDismiss={installPrompt.dismiss}
          />
        )}

        {/* Today + Tomorrow banners */}
        {showBanners && (
          <div className="mb-4">
            <TodayBanner
              today={todayInfo}
              tomorrow={tomorrowInfo}
              production={production}
            />
          </div>
        )}

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
          slideDir={slideDir}
          onSlideEnd={clearSlide}
          onDaySelect={setSelectedDay}
          selectedDay={selectedDay}
        />

        {/* Month summary */}
        <MonthSummary summary={monthSummary} month={month} />

        {/* Upcoming holidays */}
        <div className="mt-4">
          <UpcomingHolidays production={production} />
        </div>
      </div>

      {/* Floating "Hoy" button */}
      {!isCurrentMonth && (
        <button
          type="button"
          onClick={goToToday}
          className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 active:bg-indigo-800 transition-colors min-h-[44px] z-40"
        >
          <CalendarDays size={16} />
          Hoy
        </button>
      )}

      {/* Day detail bottom sheet */}
      {selectedDay && (
        <DayDetail
          day={selectedDay}
          production={production}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </div>
  )
}
