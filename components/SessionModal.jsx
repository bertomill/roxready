'use client'
import { useState, useEffect } from 'react'
import { format, parseISO } from 'date-fns'

const typeColors = {
  strength: 'bg-red-500',
  running: 'bg-blue-500',
  simulation: 'bg-purple-500',
  recovery: 'bg-green-500',
  mixed: 'bg-orange-500'
}

export default function SessionModal({ session, isCompleted, onToggle, onClose, userNote, onSaveNote, isGuest, onSignIn }) {
  const [note, setNote] = useState(userNote || '')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setNote(userNote || '')
  }, [userNote, session?.id])

  if (!session) return null

  const sessionDate = parseISO(session.date)

  const handleSaveNote = async () => {
    setIsSaving(true)
    await onSaveNote(session.id, note)
    setIsSaving(false)
  }

  const hasNoteChanged = note !== (userNote || '')

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
