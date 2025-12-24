'use client'
import { useState, useMemo } from 'react'
import { differenceInWeeks } from 'date-fns'
import { useAuth, useCompletedSessions } from '@/hooks/useSupabase'
import { trainingPlan, START_DATE } from '@/data/trainingData'
import Auth from '@/components/Auth'
import Countdown from '@/components/Countdown'
import PhaseIndicator from '@/components/PhaseIndicator'
import ProgressBar from '@/components/ProgressBar'
import WeekView from '@/components/WeekView'
import SessionModal from '@/components/SessionModal'

export default function Home() {
  const { user, loading: authLoading, signOut } = useAuth()
  const { completedSessions, toggleSession, loading: sessionsLoading } = useCompletedSessions(user?.id)
  const [selectedSession, setSelectedSession] = useState(null)
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(null)

  // Calculate current week based on today's date
  const currentWeekNumber = useMemo(() => {
    const today = new Date()
    const weeksSinceStart = differenceInWeeks(today, START_DATE)
    return Math.max(1, Math.min(20, weeksSinceStart + 1))
  }, [])

  // Set initial week to current week once loaded
  const displayWeekIndex = selectedWeekIndex ?? currentWeekNumber - 1
  const currentWeek = trainingPlan.weeks[displayWeekIndex]

  // Calculate progress
  const weekCompleted = currentWeek.sessions.filter((s) =>
    completedSessions.includes(s.id)
  ).length
  const totalCompleted = completedSessions.length
  const totalSessions = trainingPlan.weeks.reduce((acc, w) => acc + w.sessions.length, 0)

  // Show loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    )
  }

  // Show auth screen if not logged in
  if (!user) {
    return <Auth />
  }

  // Show loading state for sessions
  if (sessionsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading your training data...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">RoxReady</h1>
          <p className="text-gray-400 mt-1">
            {trainingPlan.athlete.name} & {trainingPlan.athlete.partner} • Mixed Doubles
          </p>
          <p className="text-sm text-gray-500">
            Goal: {trainingPlan.athlete.goalTime} (Current: {trainingPlan.athlete.currentTime})
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">{user.email}</p>
          <button
            onClick={signOut}
            className="text-sm text-purple-400 hover:text-purple-300"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Countdown />
        <PhaseIndicator phase={currentWeek.phase} weekNumber={currentWeek.weekNumber} />
        <ProgressBar
          completed={weekCompleted}
          total={7}
          label="This Week"
        />
        <ProgressBar
          completed={totalCompleted}
          total={totalSessions}
          label="Overall Progress"
        />
      </div>

      {/* Week Navigation */}
      <div className="mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {trainingPlan.weeks.map((week, index) => {
            const isCurrentWeek = week.weekNumber === currentWeekNumber
            const isSelected = index === displayWeekIndex
            const weekCompletedCount = week.sessions.filter((s) =>
              completedSessions.includes(s.id)
            ).length
            const allComplete = weekCompletedCount === 7

            return (
              <button
                key={week.weekNumber}
                onClick={() => setSelectedWeekIndex(index)}
                className={`
                  flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-all
                  ${isSelected
                    ? 'bg-white text-gray-900'
                    : isCurrentWeek
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }
                  ${allComplete ? 'ring-2 ring-green-500/50' : ''}
                `}
              >
                W{week.weekNumber}
                {allComplete && <span className="ml-1 text-green-400">✓</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Current Week View */}
      <WeekView
        week={currentWeek}
        completedSessions={completedSessions}
        onToggleSession={toggleSession}
        onSelectSession={setSelectedSession}
      />

      {/* Session Modal */}
      {selectedSession && (
        <SessionModal
          session={selectedSession}
          isCompleted={completedSessions.includes(selectedSession.id)}
          onToggle={toggleSession}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </main>
  )
}
