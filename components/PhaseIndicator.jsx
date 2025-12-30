'use client'

const phaseColors = {
  1: 'from-primary-600 via-primary-700 to-primary-800',
  2: 'from-accent-600 via-accent-700 to-accent-800',
  3: 'from-emerald-600 via-emerald-700 to-emerald-800'
}

const phaseLabels = {
  1: 'Base Building',
  2: 'Race-Specific',
  3: 'Taper'
}

export default function PhaseIndicator({ phase, weekNumber }) {
  return (
    <div className={`relative bg-gradient-to-br ${phaseColors[phase]} rounded-2xl p-5 shadow-xl border border-white/10 overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs uppercase tracking-wide text-white/70 font-medium">Current Phase</p>
            <p className="text-xl font-bold text-white mt-1">{phaseLabels[phase]}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-white/70 font-medium">Week</p>
            <p className="text-3xl font-bold text-white mt-1">{weekNumber}/20</p>
          </div>
        </div>
        <div className="mt-4 flex gap-1.5">
          {[1, 2, 3].map((p) => (
            <div
              key={p}
              className={`h-1.5 flex-1 rounded-full ${p <= phase ? 'bg-white shadow-lg' : 'bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
