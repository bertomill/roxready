'use client'
import { format, isToday, parseISO } from 'date-fns'

const typeColors = {
  strength: 'border-l-rose-500 bg-gradient-card',
  running: 'border-l-primary-500 bg-gradient-card',
  simulation: 'border-l-indigo-500 bg-gradient-card',
  recovery: 'border-l-emerald-500 bg-gradient-card',
  mixed: 'border-l-accent-500 bg-gradient-card'
}

const typeBadgeColors = {
  strength: 'bg-rose-500/20 text-rose-400 border border-rose-500/30',
  running: 'bg-primary-500/20 text-primary-400 border border-primary-500/30',
  simulation: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30',
  recovery: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  mixed: 'bg-accent-500/20 text-accent-400 border border-accent-500/30'
}

export default function SessionCard({ session, isCompleted, onToggle, onSelect }) {
  const sessionDate = parseISO(session.date)
  const isSessionToday = isToday(sessionDate)

  return (
    <div
      className={`
        relative border-l-4 border border-dark-border rounded-2xl p-4 cursor-pointer transition-all
        ${typeColors[session.type]}
        ${isCompleted ? 'opacity-50' : ''}
        ${isSessionToday ? 'ring-2 ring-primary-500/50 shadow-xl' : 'shadow-lg'}
        hover:scale-[1.02] hover:shadow-2xl hover:border-dark-border/50
      `}
      onClick={() => onSelect(session)}
    >
      {isSessionToday && (
        <span className="absolute -top-2 -right-2 bg-gradient-primary text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
          TODAY
        </span>
      )}

      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs px-2 py-1 rounded-lg font-medium ${typeBadgeColors[session.type]}`}>
              {session.type}
            </span>
            <span className="text-xs text-gray-500">{session.duration}</span>
          </div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">{session.day}</p>
          <h3 className={`font-semibold text-white mt-1 ${isCompleted ? 'line-through' : ''}`}>
            {session.title}
          </h3>
          <p className="text-sm text-gray-400 truncate">{session.description}</p>
          {session.targetPace && (
            <p className="text-xs text-primary-400 mt-2 font-medium">Target: {session.targetPace}</p>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggle(session.id)
          }}
          className={`
            w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all
            ${isCompleted
              ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg'
              : 'border-gray-600 hover:border-emerald-500'
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
