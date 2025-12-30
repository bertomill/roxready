'use client'
import { useState, useEffect, useMemo } from 'react'
import { format, parseISO } from 'date-fns'
import { findExerciseDetails } from '@/data/exerciseLibrary'
import WorkoutChat from './WorkoutChat'

const typeColors = {
  strength: 'bg-gradient-to-br from-rose-600 to-rose-700',
  running: 'bg-gradient-to-br from-primary-600 to-primary-700',
  simulation: 'bg-gradient-to-br from-indigo-600 to-indigo-700',
  recovery: 'bg-gradient-to-br from-emerald-600 to-emerald-700',
  mixed: 'bg-gradient-to-br from-accent-600 to-accent-700'
}

function ExerciseDetail({ exercise, isExpanded, onToggle }) {
  return (
    <div className="border border-dark-border rounded-xl overflow-hidden bg-gradient-card">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-dark-card/50 hover:bg-dark-cardHover transition-colors text-left"
      >
        <div>
          <span className="font-medium text-white">{exercise.name}</span>
          <span className="text-xs text-gray-500 ml-2">{exercise.category}</span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="p-4 bg-dark-bg/50 space-y-4">
          {/* Muscles */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2 font-medium">Muscles Worked</p>
            <div className="flex flex-wrap gap-1.5">
              {exercise.muscles.map((muscle, i) => (
                <span key={i} className="text-xs bg-dark-card border border-dark-border text-gray-300 px-2.5 py-1 rounded-lg">
                  {muscle}
                </span>
              ))}
            </div>
          </div>

          {/* Step by Step */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-3 font-medium">Step-by-Step</p>
            <ol className="space-y-2.5">
              {exercise.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-primary text-white text-xs flex items-center justify-center font-medium shadow-lg">
                    {i + 1}
                  </span>
                  <span className="text-gray-300">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Tips */}
          {exercise.tips && (
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2 font-medium">Pro Tips</p>
              <ul className="space-y-2">
                {exercise.tips.map((tip, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-300">
                    <span className="text-accent-400">💡</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Hyrox Specific Info */}
          {exercise.hyroxSpecific && (
            <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4">
              <p className="text-xs text-primary-400 uppercase tracking-wide mb-3 font-medium">Hyrox Race Info</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {exercise.hyroxSpecific.distance && (
                  <div>
                    <span className="text-gray-400">Distance:</span>
                    <span className="ml-1 text-white font-medium">{exercise.hyroxSpecific.distance}</span>
                  </div>
                )}
                {exercise.hyroxSpecific.weight && (
                  <div>
                    <span className="text-gray-400">Weight:</span>
                    <span className="ml-1 text-white font-medium">{exercise.hyroxSpecific.weight}</span>
                  </div>
                )}
                {exercise.hyroxSpecific.reps && (
                  <div>
                    <span className="text-gray-400">Reps:</span>
                    <span className="ml-1 text-white font-medium">{exercise.hyroxSpecific.reps}</span>
                  </div>
                )}
                {exercise.hyroxSpecific.target && (
                  <div>
                    <span className="text-gray-400">Target:</span>
                    <span className="ml-1 text-white font-medium">{exercise.hyroxSpecific.target}</span>
                  </div>
                )}
              </div>
              {exercise.hyroxSpecific.strategy && (
                <p className="text-sm text-primary-300 mt-3">
                  <span className="text-primary-200 font-medium">Strategy:</span> {exercise.hyroxSpecific.strategy}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function SessionModal({ session, isCompleted, onToggle, onClose, userNote, onSaveNote, isGuest, onSignIn }) {
  const [note, setNote] = useState(userNote || '')
  const [isSaving, setIsSaving] = useState(false)
  const [showExercises, setShowExercises] = useState(false)
  const [expandedExercises, setExpandedExercises] = useState({})
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    setNote(userNote || '')
  }, [userNote, session?.id])

  // Find matching exercises from the workout
  const exercises = useMemo(() => {
    if (!session?.details?.main) return []
    const mainText = session.details.main.join(' ')
    return findExerciseDetails(mainText)
  }, [session])

  if (!session) return null

  const sessionDate = parseISO(session.date)

  const handleSaveNote = async () => {
    setIsSaving(true)
    await onSaveNote(session.id, note)
    setIsSaving(false)
  }

  const hasNoteChanged = note !== (userNote || '')

  const toggleExercise = (exerciseName) => {
    setExpandedExercises(prev => ({
      ...prev,
      [exerciseName]: !prev[exerciseName]
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div
        className="bg-gradient-card border border-dark-border rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${typeColors[session.type]} p-6 rounded-t-2xl shadow-lg`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-white/80">{session.day} • {format(sessionDate, 'MMM d, yyyy')}</p>
              <h2 className="text-2xl font-bold mt-1 text-white">{session.title}</h2>
              <p className="text-sm text-white/80 mt-1">{session.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="text-center">
              <p className="text-xs text-white/70">Duration</p>
              <p className="font-semibold text-white">{session.duration}</p>
            </div>
            {session.targetPace && (
              <div className="text-center">
                <p className="text-xs text-white/70">Target Pace</p>
                <p className="font-semibold text-white">{session.targetPace}</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {session.details?.warmup && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Warm-up</h3>
              <p className="text-white">{session.details.warmup}</p>
            </div>
          )}

          {session.details?.main && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Main Workout</h3>
              <ul className="space-y-2">
                {session.details.main.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {session.details?.notes && (
            <div className="bg-dark-card/50 border border-dark-border rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Workout Tips</h3>
              <p className="text-gray-300 text-sm">{session.details.notes}</p>
            </div>
          )}

          {/* Exercise Breakdown Section */}
          {exercises.length > 0 && (
            <div>
              <button
                onClick={() => setShowExercises(!showExercises)}
                className="w-full flex items-center justify-between py-4 px-5 bg-dark-card border border-dark-border hover:bg-dark-cardHover rounded-xl transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">📖</span>
                  <span className="font-medium text-white">Exercise Breakdown</span>
                  <span className="text-xs text-gray-500">({exercises.length} exercises)</span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${showExercises ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showExercises && (
                <div className="mt-3 space-y-3">
                  {exercises.map((exercise, i) => (
                    <ExerciseDetail
                      key={i}
                      exercise={exercise}
                      isExpanded={expandedExercises[exercise.name]}
                      onToggle={() => toggleExercise(exercise.name)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* AI Coach Chat */}
          <WorkoutChat
            session={session}
            isOpen={showChat}
            onToggle={() => setShowChat(!showChat)}
          />

          {/* User Notes Section - Only for logged in users */}
          {!isGuest && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Your Notes</h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add your notes here... (times, reps, how you felt, etc.)"
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-500 resize-none"
                rows={3}
              />
              {hasNoteChanged && (
                <button
                  onClick={handleSaveNote}
                  disabled={isSaving}
                  className="mt-3 px-4 py-2 bg-gradient-primary text-white rounded-xl text-sm font-medium disabled:opacity-50 transition-all hover:scale-105 shadow-lg"
                >
                  {isSaving ? 'Saving...' : 'Save Note'}
                </button>
              )}
            </div>
          )}

          {/* Guest Sign In Prompt */}
          {isGuest ? (
            <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-5 text-center">
              <p className="text-primary-300 text-sm mb-4">
                Sign in to track this workout and add notes
              </p>
              <button
                onClick={onSignIn}
                className="px-6 py-2.5 bg-gradient-primary text-white rounded-xl text-sm font-medium transition-all hover:scale-105 shadow-lg"
              >
                Sign In to Track
              </button>
            </div>
          ) : (
            <button
              onClick={() => onToggle(session.id)}
              className={`
                w-full py-3.5 rounded-xl font-semibold transition-all shadow-lg
                ${isCompleted
                  ? 'bg-dark-card border border-dark-border hover:bg-dark-cardHover text-gray-300'
                  : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white'
                }
              `}
            >
              {isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
