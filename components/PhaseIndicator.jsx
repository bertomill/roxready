'use client'

const phaseColors = {
  1: 'from-blue-600 to-blue-800',
  2: 'from-orange-500 to-orange-700',
  3: 'from-green-500 to-green-700'
}

const phaseLabels = {
  1: 'Base Building',
  2: 'Race-Specific',
  3: 'Taper'
}

export default function PhaseIndicator({ phase, weekNumber }) {
  return (
    <div className={`bg-gradient-to-r ${phaseColors[phase]} rounded-xl p-4`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs uppercase tracking-wide opacity-80">Current Phase</p>
          <p className="text-xl font-bold">{phaseLabels[phase]}</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wide opacity-80">Week</p>
          <p className="text-2xl font-bold">{weekNumber}/20</p>
        </div>
      </div>
      <div className="mt-3 flex gap-1">
        {[1, 2, 3].map((p) => (
          <div
            key={p}
            className={`h-1 flex-1 rounded ${p <= phase ? 'bg-white' : 'bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  )
}
