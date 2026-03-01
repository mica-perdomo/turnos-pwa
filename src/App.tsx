import { useState, useCallback, useEffect, useRef } from 'react'
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
import { CalendarLegend, MonthSummary } from './components/info/MonthSummary'
import { UpcomingHolidays } from './components/info/UpcomingHolidays'
import { DayDetail } from './components/info/DayDetail'
import { SettingsBar } from './components/settings/SettingsBar'
import { Onboarding } from './components/ui/Onboarding'
import { InstallGuide } from './components/ui/InstallGuide'
import { Settings, CalendarDays, CheckCircle, Share2 } from 'lucide-react'
import { PROD_COLORS, MONTHS_ES } from './lib/constants'
import { getItem, setItem } from './lib/storage'
import { toPng } from 'html-to-image'

function formatDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export default function App() {
  const { production, setProduction, needsOnboarding } = useProduction()
  const { year, month, prevMonth, nextMonth, goToToday, goTo, slideDir, clearSlide } =
    useCalendarMonth()
  const { grid, todayInfo, tomorrowInfo, monthSummary } = useShiftData(year, month, production)
  const { theme, setTheme } = useTheme()

  const installPrompt = useInstallPrompt()
  const { size: zoomSize, setSize: setZoomSize } = useZoom()
  const swipeHandlers = useSwipe(nextMonth, prevMonth)

  // Show toast when app was just updated
  const [updateToast, setUpdateToast] = useState<string | null>(null)
  useEffect(() => {
    const prev = localStorage.getItem('turnos_app_version')
    if (prev && prev !== __APP_VERSION__) {
      setUpdateToast(__APP_VERSION__)
      setTimeout(() => setUpdateToast(null), 4000)
    }
    localStorage.setItem('turnos_app_version', __APP_VERSION__)
  }, [])

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone === true
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  const [installGuideSkipped, setInstallGuideSkipped] = useState(() => {
    try { return sessionStorage.getItem('turnos_install_guide_skip') === '1' } catch { return false }
  })
  const showInstallGuide = !isStandalone && !installGuideSkipped && (installPrompt.canPrompt || isIOS)

  const handleInstallSkip = useCallback(() => {
    setInstallGuideSkipped(true)
    sessionStorage.setItem('turnos_install_guide_skip', '1')
  }, [])

  const handleInstallDirect = useCallback(async () => {
    await installPrompt.install()
    handleInstallSkip()
  }, [installPrompt, handleInstallSkip])

  const [notes, setNotes] = useState<Record<string, string>>(() => getItem<Record<string, string>>('notes', {}))
  const handleNoteChange = useCallback((dateKey: string, text: string) => {
    setNotes(prev => {
      const next = { ...prev }
      if (text.trim()) {
        next[dateKey] = text
      } else {
        delete next[dateKey]
      }
      setItem('notes', next)
      return next
    })
  }, [])

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
      return v === null ? false : JSON.parse(v)
    } catch { return false }
  })
  const handleShowSummary = useCallback((v: boolean) => {
    setShowSummary(v)
    localStorage.setItem('turnos_show_summary', JSON.stringify(v))
  }, [])
  const [showHolidays, setShowHolidays] = useState(() => {
    try {
      const v = localStorage.getItem('turnos_show_holidays')
      return v === null ? true : JSON.parse(v)
    } catch { return true }
  })
  const handleShowHolidays = useCallback((v: boolean) => {
    setShowHolidays(v)
    localStorage.setItem('turnos_show_holidays', JSON.stringify(v))
  }, [])

  const calendarRef = useRef<HTMLDivElement>(null)
  const [sharing, setSharing] = useState(false)
  const [capturingShare, setCapturingShare] = useState(false)

  const handleShareCalendar = useCallback(async () => {
    if (!calendarRef.current || sharing) return
    setSharing(true)
    setCapturingShare(true)
    // Wait one frame so the legend re-renders with time ranges
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
    try {
      const dataUrl = await toPng(calendarRef.current, {
        backgroundColor: document.documentElement.classList.contains('dark') ? '#171717' : '#ffffff',
        pixelRatio: 2,
      })
      setCapturingShare(false)
      const res = await fetch(dataUrl)
      const blob = await res.blob()
      const file = new File([blob], `turnos-${MONTHS_ES[month]}-${year}.png`, { type: 'image/png' })

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file] })
      } else {
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = file.name
        a.click()
      }
    } catch (e) {
      setCapturingShare(false)
      if ((e as DOMException)?.name !== 'AbortError') console.error('Share failed:', e)
    } finally {
      setSharing(false)
    }
  }, [sharing, month, year])

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
        <div className="flex items-center justify-between pt-[calc(env(safe-area-inset-top,0px)+24px)] pb-4">
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
              showHolidays={showHolidays}
              onShowHolidaysChange={handleShowHolidays}
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

        {/* Shareable calendar block */}
        <div ref={calendarRef} className={capturingShare ? 'px-6' : ''}>
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
            notes={notes}
          />

          {/* Calendar legend (always visible) */}
          <CalendarLegend forShare={capturingShare} />
        </div>

        {/* Share calendar button */}
        <button
          type="button"
          onClick={handleShareCalendar}
          disabled={sharing}
          className="flex items-center justify-center gap-2 w-full py-2.5 mt-1 rounded-lg text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 active:bg-neutral-200 dark:active:bg-neutral-700 transition-colors disabled:opacity-50"
        >
          <Share2 size={16} className={sharing ? 'animate-pulse' : ''} />
          {sharing ? 'Generando...' : 'Compartir calendario'}
        </button>

        {/* Month summary (optional) */}
        {showSummary && <MonthSummary summary={monthSummary} month={month} />}

        {/* Upcoming holidays */}
        {showHolidays && (
          <div className="mt-4">
            <UpcomingHolidays production={production} />
          </div>
        )}
      </div>

      {/* Floating "Hoy" button */}
      {!isCurrentMonth && (
        <button
          type="button"
          onClick={goToToday}
          className="fixed bottom-6 right-6 flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-indigo-600 text-white text-base font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 active:bg-indigo-800 transition-colors z-40"
        >
          <CalendarDays size={20} />
          Hoy
        </button>
      )}

      {/* Day detail bottom sheet */}
      {selectedDay && (
        <DayDetail
          day={selectedDay}
          production={production}
          onClose={() => setSelectedDay(null)}
          note={notes[formatDateKey(selectedDay.date)] ?? ''}
          onNoteChange={(text) => handleNoteChange(formatDateKey(selectedDay.date), text)}
        />
      )}

      {/* Update toast */}
      {updateToast && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 animate-[toastIn_0.3s_ease-out]">
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium shadow-lg" style={{ backgroundColor: '#171717', color: '#ffffff' }}>
            <CheckCircle size={18} />
            Actualizado a v{updateToast}
          </div>
        </div>
      )}
    </div>
  )
}
