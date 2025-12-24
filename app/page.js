'use client'
import { useState, useMemo } from 'react'
import { differenceInWeeks } from 'date-fns'
import { useAuth, useCompletedSessions, useSessionNotes } from '@/hooks/useSupabase'
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
  const { notes, saveNote } = useSessionNotes(user?.id)
  const [selectedSession, setSelectedSession] = useState(null)
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(null)
  const [showAuthModal, setShowAuthModal] = useState(false)

  // Calculate current week based on today's date
  const currentWeekNumber = useMemo(() => {
    const today = new Date()
    const weeksSinceStart = differenceInWeeks(today, START_DATE)
    return Math.max(1, Math.min(20, weeksSinceStart + 1))
  }, [])

  // Set initial week to current week once loaded
  const displayWeekIndex = selectedWeekIndex ?? currentWeekNumber - 1
  const currentWeek = trainingPlan.weeks[displayWeekIndex]

  // Calculate progress (only for logged in users)
  const weekCompleted = user ? currentWeek.sessions.filter((s) =>
    completedSessions.includes(s.id)
  ).length : 0
  const totalCompleted = user ? completedSessions.length : 0
  const totalSessions = trainingPlan.weeks.reduce((acc, w) => acc + w.sessions.length, 0)

  // Handle actions that require auth
  const handleToggleSession = (sessionId) => {
    if (!user) {
      setShowAuthModal(true)
      return
    }
    toggleSession(sessionId)
  }

  const handleSaveNote = (sessionId, note) => {
    if (!user) {
      setShowAuthModal(true)
      return
    }
    saveNote(sessionId, note)
  }

  // Show loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    )
  }

  // Show loading state for sessions (only when logged in)
  if (user && sessionsLoading) {
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
          {user ? (
            <>
              <p className="text-sm text-gray-400">{user.email}</p>
              <button
                onClick={signOut}
                className="text-sm text-purple-400 hover:text-purple-300"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-medium transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Guest Banner */}
      {!user && (
        <div className="bg-purple-600/20 border border-purple-500/30 rounded-xl p-4 mb-6 flex items-center justify-between">
          <p className="text-purple-200 text-sm">
            Sign in to track your progress and add notes to workouts
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-medium transition-colors"
          >
            Sign In
          </button>
        </div>
      )}

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
            const weekCompletedCount = user ? week.sessions.filter((s) =>
              completedSessions.includes(s.id)
            ).length : 0
            const allComplete = user && weekCompletedCount === 7

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
        completedSessions={user ? completedSessions : []}
        onToggleSession={handleToggleSession}
        onSelectSession={setSelectedSession}
        isGuest={!user}
      />

      {/* Session Modal */}
      {selectedSession && (
        <SessionModal
          session={selectedSession}
          isCompleted={user && completedSessions.includes(selectedSession.id)}
          onToggle={handleToggleSession}
          onClose={() => setSelectedSession(null)}
          userNote={user ? notes[selectedSession.id] : undefined}
          onSaveNote={handleSaveNote}
          isGuest={!user}
          onSignIn={() => setShowAuthModal(true)}
        />
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={() => setShowAuthModal(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <Auth onClose={() => setShowAuthModal(false)} />
          </div>
        </div>
      )}
    </main>
  )
}
