'use client'
import { useState, useEffect, useMemo } from 'react'
import { format, parseISO } from 'date-fns'
import { findExerciseDetails } from '@/data/exerciseLibrary'
import WorkoutChat from './WorkoutChat'

const typeColors = {
  strength: 'bg-red-500',
  running: 'bg-blue-500',
  simulation: 'bg-purple-500',
  recovery: 'bg-green-500',
  mixed: 'bg-orange-500'
}

function ExerciseDetail({ exercise, isExpanded, onToggle }) {
  return (
    <div className="border border-gray-600 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 bg-gray-700/50 hover:bg-gray-700 transition-colors text-left"
      >
        <div>
          <span className="font-medium">{exercise.name}</span>
          <span className="text-xs text-gray-400 ml-2">{exercise.category}</span>
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
        <div className="p-4 bg-gray-800/50 space-y-4">
          {/* Muscles */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Muscles Worked</p>
            <div className="flex flex-wrap gap-1">
              {exercise.muscles.map((muscle, i) => (
                <span key={i} className="text-xs bg-gray-700 px-2 py-0.5 rounded">
                  {muscle}
                </span>
              ))}
            </div>
          </div>

          {/* Step by Step */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Step-by-Step</p>
            <ol className="space-y-2">
              {exercise.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 text-xs flex items-center justify-center">
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
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Pro Tips</p>
              <ul className="space-y-1">
                {exercise.tips.map((tip, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-400">
                    <span className="text-yellow-500">💡</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Hyrox Specific Info */}
          {exercise.hyroxSpecific && (
            <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-3">
              <p className="text-xs text-purple-400 uppercase tracking-wide mb-2">Hyrox Race Info</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {exercise.hyroxSpecific.distance && (
                  <div>
                    <span className="text-gray-500">Distance:</span>
                    <span className="ml-1 text-gray-200">{exercise.hyroxSpecific.distance}</span>
                  </div>
                )}
                {exercise.hyroxSpecific.weight && (
                  <div>
                    <span className="text-gray-500">Weight:</span>
                    <span className="ml-1 text-gray-200">{exercise.hyroxSpecific.weight}</span>
                  </div>
                )}
                {exercise.hyroxSpecific.reps && (
                  <div>
                    <span className="text-gray-500">Reps:</span>
                    <span className="ml-1 text-gray-200">{exercise.hyroxSpecific.reps}</span>
                  </div>
                )}
                {exercise.hyroxSpecific.target && (
                  <div>
                    <span className="text-gray-500">Target:</span>
                    <span className="ml-1 text-gray-200">{exercise.hyroxSpecific.target}</span>
                  </div>
                )}
              </div>
              {exercise.hyroxSpecific.strategy && (
                <p className="text-sm text-purple-200 mt-2">
                  <span className="text-purple-400">Strategy:</span> {exercise.hyroxSpecific.strategy}
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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div
        className="bg-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${typeColors[session.type]} p-6 rounded-t-2xl`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-80">{session.day} • {format(sessionDate, 'MMM d, yyyy')}</p>
              <h2 className="text-2xl font-bold mt-1">{session.title}</h2>
              <p className="text-sm opacity-80 mt-1">{session.description}</p>
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
              <p className="text-xs opacity-70">Duration</p>
              <p className="font-semibold">{session.duration}</p>
            </div>
            {session.targetPace && (
              <div className="text-center">
                <p className="text-xs opacity-70">Target Pace</p>
                <p className="font-semibold">{session.targetPace}</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {session.details?.warmup && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Warm-up</h3>
              <p className="text-gray-200">{session.details.warmup}</p>
            </div>
          )}

          {session.details?.main && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Main Workout</h3>
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
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">Workout Tips</h3>
              <p className="text-gray-300 text-sm">{session.details.notes}</p>
            </div>
          )}

          {/* Exercise Breakdown Section */}
          {exercises.length > 0 && (
            <div>
              <button
                onClick={() => setShowExercises(!showExercises)}
                className="w-full flex items-center justify-between py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">📖</span>
                  <span className="font-medium">Exercise Breakdown</span>
                  <span className="text-xs text-gray-400">({exercises.length} exercises)</span>
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
                <div className="mt-3 space-y-2">
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
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Your Notes</h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add your notes here... (times, reps, how you felt, etc.)"
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200 placeholder-gray-500 resize-none"
                rows={3}
              />
              {hasNoteChanged && (
                <button
                  onClick={handleSaveNote}
                  disabled={isSaving}
                  className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-medium disabled:opacity-50 transition-colors"
                >
                  {isSaving ? 'Saving...' : 'Save Note'}
                </button>
              )}
            </div>
          )}

          {/* Guest Sign In Prompt */}
          {isGuest ? (
            <div className="bg-purple-600/20 border border-purple-500/30 rounded-xl p-4 text-center">
              <p className="text-purple-200 text-sm mb-3">
                Sign in to track this workout and add notes
              </p>
              <button
                onClick={onSignIn}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-medium transition-colors"
              >
                Sign In to Track
              </button>
            </div>
          ) : (
            <button
              onClick={() => onToggle(session.id)}
              className={`
                w-full py-3 rounded-xl font-semibold transition-colors
                ${isCompleted
                  ? 'bg-gray-600 hover:bg-gray-500 text-white'
                  : 'bg-green-500 hover:bg-green-400 text-white'
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
