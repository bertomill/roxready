'use client'
import { format, parseISO } from 'date-fns'
import SessionCard from './SessionCard'

export default function WeekView({ week, completedSessions, onToggleSession, onSelectSession }) {
  const weekStart = parseISO(week.startDate)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Week {week.weekNumber}</h2>
          <p className="text-sm text-gray-400">
            {format(weekStart, 'MMM d')} - {format(new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000), 'MMM d, yyyy')}
          </p>
        </div>
        <span className={`
          text-sm px-3 py-1.5 rounded-xl font-medium border
          ${week.phase === 1 ? 'bg-primary-500/20 text-primary-400 border-primary-500/30' : ''}
          ${week.phase === 2 ? 'bg-accent-500/20 text-accent-400 border-accent-500/30' : ''}
          ${week.phase === 3 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : ''}
        `}>
          {week.phaseName}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {week.sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            isCompleted={completedSessions.includes(session.id)}
            onToggle={onToggleSession}
            onSelect={onSelectSession}
          />
        ))}
      </div>
    </div>
  )
}
