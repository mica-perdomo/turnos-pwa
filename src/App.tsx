import { useState, useCallback } from 'react'
import { useProduction } from './hooks/useProduction'
import { useCalendarMonth } from './hooks/useCalendarMonth'
import { useShiftData, type CalendarDay } from './hooks/useShiftData'
import { useSwipe } from './hooks/useSwipe'
import { useTheme } from './hooks/useTheme'

import { useInstallPrompt } from './hooks/useInstallPrompt'
import { useZoom } from './hooks/useZoom'

import { MonthNavigator } from './components/calendar/MonthNavigator'
import { CalendarGrid } from './components/calendar/CalendarGrid'
import { TodayBanner } from './components/info/TodayBanner'
import { MonthSummary } from './components/info/MonthSummary'
import { UpcomingHolidays } from './components/info/UpcomingHolidays'
import { DayDetail } from './components/info/DayDetail'
import { SettingsBar } from './components/settings/SettingsBar'
import { Onboarding } from './components/ui/Onboarding'
import { InstallGuide } from './components/ui/InstallGuide'
import { Settings, CalendarDays } from 'lucide-react'
import { PROD_COLORS } from './lib/constants'

export default function App() {
  const { production, setProduction, needsOnboarding } = useProduction()
  const { year, month, prevMonth, nextMonth, goToToday, goTo, slideDir, clearSlide } =
    useCalendarMonth()
  const { grid, todayInfo, tomorrowInfo, monthSummary } = useShiftData(year, month, production)
  const { theme, setTheme } = useTheme()

  const installPrompt = useInstallPrompt()
  const { size: zoomSize, setSize: setZoomSize } = useZoom()
  const swipeHandlers = useSwipe(nextMonth, prevMonth)

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone === true
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  const [installGuideSkipped, setInstallGuideSkipped] = useState(() => {
    try { return localStorage.getItem('turnos_install_guide_done') === '1' } catch { return false }
  })
  const showInstallGuide = needsOnboarding && !isStandalone && !installGuideSkipped

  const handleInstallSkip = useCallback(() => {
    setInstallGuideSkipped(true)
    localStorage.setItem('turnos_install_guide_done', '1')
  }, [])

  const handleInstallDirect = useCallback(async () => {
    await installPrompt.install()
    handleInstallSkip()
  }, [installPrompt, handleInstallSkip])

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
  const [showSummary, setShowSummary] = useState(() => {
    try {
      const v = localStorage.getItem('turnos_show_summary')
      return v === null ? true : JSON.parse(v)
    } catch { return true }
  })
  const handleShowSummary = useCallback((v: boolean) => {
    setShowSummary(v)
    localStorage.setItem('turnos_show_summary', JSON.stringify(v))
  }, [])

  const now = new Date()
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth()

  if (showInstallGuide) {
    return (
      <InstallGuide
        canPrompt={installPrompt.canPrompt}
        isIOS={isIOS}
        onInstall={handleInstallDirect}
        onSkip={handleInstallSkip}
      />
    )
  }

  if (needsOnboarding) {
    return <Onboarding onSelect={setProduction} />
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors overflow-x-hidden">
      <div
        className="mx-auto max-w-md px-4 pb-8"
        {...swipeHandlers}
      >
        {/* Header */}
        <div className="flex items-center justify-between pt-[max(env(safe-area-inset-top,0px),24px)] pb-4">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold">Turnos</h1>
            <span className={`px-3 py-1 rounded-full ${PROD_COLORS.bg[production]} text-white text-xs`}>
              Producción {production}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 active:bg-neutral-400 dark:active:bg-neutral-500 flex items-center justify-center transition-colors"
            aria-label="Configuración"
          >
            <Settings size={22} />
          </button>
        </div>

        {/* Settings panel */}
        {showSettings && (
          <div className="mb-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 p-4 border border-neutral-200 dark:border-neutral-700">
            <SettingsBar
              production={production}
              onProductionChange={setProduction}
              theme={theme}
              onThemeChange={setTheme}
              showBanners={showBanners}
              onShowBannersChange={handleShowBanners}
              showSummary={showSummary}
              onShowSummaryChange={handleShowSummary}
              zoomSize={zoomSize}
              onZoomSizeChange={setZoomSize}
            />
          </div>
        )}

        {/* Today + Tomorrow banners */}
        {showBanners && (
          <div className="mb-5">
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
        {showSummary && <MonthSummary summary={monthSummary} month={month} />}

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
