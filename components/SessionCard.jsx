'use client'
import { format, isToday, parseISO } from 'date-fns'

const typeColors = {
  strength: 'border-red-500 bg-red-500/10',
  running: 'border-blue-500 bg-blue-500/10',
  simulation: 'border-purple-500 bg-purple-500/10',
  recovery: 'border-green-500 bg-green-500/10',
  mixed: 'border-orange-500 bg-orange-500/10'
}

const typeBadgeColors = {
  strength: 'bg-red-500',
  running: 'bg-blue-500',
  simulation: 'bg-purple-500',
  recovery: 'bg-green-500',
  mixed: 'bg-orange-500'
}

export default function SessionCard({ session, isCompleted, onToggle, onSelect }) {
  const sessionDate = parseISO(session.date)
  const isSessionToday = isToday(sessionDate)

  return (
    <div
      className={`
        relative border-l-4 rounded-lg p-4 cursor-pointer transition-all
        ${typeColors[session.type]}
        ${isCompleted ? 'opacity-50' : ''}
        ${isSessionToday ? 'ring-2 ring-yellow-400' : ''}
        hover:scale-[1.02] hover:shadow-lg
      `}
      onClick={() => onSelect(session)}
    >
      {isSessionToday && (
        <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
          TODAY
        </span>
      )}

      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs px-2 py-0.5 rounded ${typeBadgeColors[session.type]}`}>
              {session.type}
            </span>
            <span className="text-xs text-gray-400">{session.duration}</span>
          </div>
          <p className="text-xs text-gray-400">{session.day}</p>
          <h3 className={`font-semibold ${isCompleted ? 'line-through' : ''}`}>
            {session.title}
          </h3>
          <p className="text-sm text-gray-400 truncate">{session.description}</p>
          {session.targetPace && (
            <p className="text-xs text-blue-400 mt-1">Target: {session.targetPace}</p>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggle(session.id)
          }}
          className={`
            w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0
            ${isCompleted
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-500 hover:border-green-400'
            }
          `}
        >
          {isCompleted && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
