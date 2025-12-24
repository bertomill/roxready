'use client'
import { format, parseISO } from 'date-fns'
import SessionCard from './SessionCard'

export default function WeekView({ week, completedSessions, onToggleSession, onSelectSession }) {
  const weekStart = parseISO(week.startDate)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">Week {week.weekNumber}</h2>
          <p className="text-sm text-gray-400">
            {format(weekStart, 'MMM d')} - {format(new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000), 'MMM d, yyyy')}
          </p>
        </div>
        <span className={`
          text-sm px-3 py-1 rounded-full
          ${week.phase === 1 ? 'bg-blue-500/20 text-blue-400' : ''}
          ${week.phase === 2 ? 'bg-orange-500/20 text-orange-400' : ''}
          ${week.phase === 3 ? 'bg-green-500/20 text-green-400' : ''}
        `}>
          {week.phaseName}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
