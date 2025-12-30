'use client'
import { useState, useMemo } from 'react'
import { differenceInWeeks, format } from 'date-fns'
import { useAuth, useCompletedSessions, useSessionNotes, useFeedback } from '@/hooks/useSupabase'
import { trainingPlan, START_DATE } from '@/data/trainingData'
import Auth from '@/components/Auth'
import Countdown from '@/components/Countdown'
import PhaseIndicator from '@/components/PhaseIndicator'
import ProgressBar from '@/components/ProgressBar'
import WeekView from '@/components/WeekView'
import SessionModal from '@/components/SessionModal'
import Logo from '@/components/Logo'
import Link from 'next/link'

const ADMIN_EMAIL = 'bertmill19@gmail.com'

export default function Home() {
  const { user, loading: authLoading, signOut } = useAuth()
  const { completedSessions, toggleSession, loading: sessionsLoading } = useCompletedSessions(user?.id)
  const { notes, saveNote } = useSessionNotes(user?.id)
  const { submitFeedback } = useFeedback()
  const [selectedSession, setSelectedSession] = useState(null)
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false)
  const [feedbackSuccess, setFeedbackSuccess] = useState(false)

  const handleSubmitFeedback = async () => {
    if (!feedbackMessage.trim()) return
    setFeedbackSubmitting(true)
    const success = await submitFeedback(feedbackMessage, user?.email || null)
    setFeedbackSubmitting(false)
    if (success) {
      setFeedbackSuccess(true)
      setFeedbackMessage('')
      setTimeout(() => {
        setShowFeedbackModal(false)
        setFeedbackSuccess(false)
      }, 2000)
    }
  }

  // Calculate current week based on today's date
  const currentWeekNumber = useMemo(() => {
    const today = new Date()
    const weeksSinceStart = differenceInWeeks(today, START_DATE)
    return Math.max(1, Math.min(20, weeksSinceStart + 1))
  }, [])

  // Get current week
  const currentWeek = trainingPlan.weeks[currentWeekNumber - 1]

  // Find today's workout
  const today = new Date()
  const todaySession = useMemo(() => {
    return currentWeek.sessions.find(session => {
      const sessionDate = new Date(session.date)
      return sessionDate.toDateString() === today.toDateString()
    })
  }, [currentWeek, today])

  // Get this week's upcoming workouts (excluding today)
  const upcomingWorkouts = useMemo(() => {
    return currentWeek.sessions.filter(session => {
      const sessionDate = new Date(session.date)
      return sessionDate > today || sessionDate.toDateString() === today.toDateString()
    }).slice(0, 5) // Show max 5 upcoming
  }, [currentWeek, today])

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
    <main className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
      {/* Simple Header */}
      <header className="mb-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Logo className="w-10 h-10" />
          <div>
            <h1 className="text-2xl font-bold text-white">RoxReady</h1>
            <p className="text-gray-500 text-sm">Week {currentWeek.weekNumber} • {currentWeek.phaseName}</p>
          </div>
        </div>
        {user ? (
          <button
            onClick={signOut}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-4 py-2 bg-gradient-primary text-white rounded-xl text-sm font-medium transition-all hover:scale-105 shadow-lg"
          >
            Sign In
          </button>
        )}
      </header>

      {/* Today's Workout - Main Focus */}
      {todaySession ? (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Today's Workout</h2>
            <span className="text-sm text-gray-400">{format(new Date(todaySession.date), 'EEEE, MMM d')}</span>
          </div>

          <div className="bg-gradient-card border border-dark-border rounded-2xl p-6 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-1 rounded-lg font-medium bg-primary-500/20 text-primary-400 border border-primary-500/30">
                    {todaySession.type}
                  </span>
                  <span className="text-xs text-gray-500">{todaySession.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{todaySession.title}</h3>
                <p className="text-gray-400">{todaySession.description}</p>
                {todaySession.targetPace && (
                  <p className="text-sm text-primary-400 mt-2">Target: {todaySession.targetPace}</p>
                )}
              </div>
              {user && (
                <button
                  onClick={() => handleToggleSession(todaySession.id)}
                  className={`ml-4 w-8 h-8 rounded-xl border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    completedSessions.includes(todaySession.id)
                      ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg'
                      : 'border-gray-600 hover:border-emerald-500'
                  }`}
                >
                  {completedSessions.includes(todaySession.id) && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              )}
            </div>

            {/* Workout Details */}
            {todaySession.details && (
              <div className="mt-6 space-y-4 border-t border-dark-border pt-6">
                {todaySession.details.warmup && (
                  <div>
                    <h4 className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">Warm-up</h4>
                    <p className="text-gray-300 text-sm">{todaySession.details.warmup}</p>
                  </div>
                )}
                {todaySession.details.main && (
                  <div>
                    <h4 className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">Main Workout</h4>
                    <ul className="space-y-1.5">
                      {todaySession.details.main.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-gray-500 mt-0.5">•</span>
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Notes Section */}
            {user && (
              <div className="mt-6 border-t border-dark-border pt-6">
                <h4 className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-3">Your Notes</h4>
                <textarea
                  value={notes[todaySession.id] || ''}
                  onChange={(e) => handleSaveNote(todaySession.id, e.target.value)}
                  placeholder="How did it go? Times, reps, how you felt..."
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>
            )}

            {!user && (
              <div className="mt-6 bg-primary-500/10 border border-primary-500/20 rounded-xl p-4 text-center">
                <p className="text-primary-300 text-sm mb-3">Sign in to track progress and add notes</p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 bg-gradient-primary text-white rounded-xl text-sm font-medium transition-all hover:scale-105 shadow-lg"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mb-8 bg-gradient-card border border-dark-border rounded-2xl p-8 text-center">
          <p className="text-gray-400">No workout scheduled for today. Rest day!</p>
        </div>
      )}

      {/* This Week's Workouts */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">This Week</h2>
        <div className="grid gap-3">
          {upcomingWorkouts.map((session) => (
            <button
              key={session.id}
              onClick={() => setSelectedSession(session)}
              className="bg-gradient-card border border-dark-border rounded-xl p-4 text-left hover:bg-dark-cardHover transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500">{format(new Date(session.date), 'EEE, MMM d')}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-dark-bg text-gray-400">{session.type}</span>
                  </div>
                  <p className="text-white font-medium">{session.title}</p>
                  <p className="text-sm text-gray-400 mt-1">{session.duration}</p>
                </div>
                {user && completedSessions.includes(session.id) && (
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowAuthModal(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <Auth onClose={() => setShowAuthModal(false)} />
          </div>
        </div>
      )}

      {/* Feedback Button */}
      <button
        onClick={() => setShowFeedbackModal(true)}
        className="fixed bottom-6 right-6 bg-gradient-primary text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110 z-40"
        title="Send Feedback"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={() => setShowFeedbackModal(false)}>
          <div className="bg-gradient-card border border-dark-border rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4 text-white">Send Feedback</h2>
            {feedbackSuccess ? (
              <div className="text-center py-8">
                <div className="text-green-400 text-4xl mb-2">✓</div>
                <p className="text-gray-300">Thank you for your feedback!</p>
              </div>
            ) : (
              <>
                <textarea
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  placeholder="Share your thoughts, suggestions, or report issues..."
                  className="w-full h-32 px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => setShowFeedbackModal(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitFeedback}
                    disabled={feedbackSubmitting || !feedbackMessage.trim()}
                    className="px-4 py-2 bg-gradient-primary text-white rounded-xl font-medium transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {feedbackSubmitting ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
