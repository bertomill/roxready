'use client'

export default function ProgressBar({ completed, total, label }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="bg-gradient-card border border-dark-border rounded-2xl p-4 shadow-xl">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-400 font-medium uppercase tracking-wide">{label}</span>
        <span className="text-sm font-semibold text-white">{completed}/{total}</span>
      </div>
      <div className="h-2 bg-dark-bg rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-300 shadow-lg"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-right text-xs text-gray-500 mt-2 font-medium">{percentage}% complete</p>
    </div>
  )
}
