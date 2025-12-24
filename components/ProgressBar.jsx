'use client'

export default function ProgressBar({ completed, total, label }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="bg-gray-800 rounded-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">{label}</span>
        <span className="text-sm font-medium">{completed}/{total} sessions</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-right text-xs text-gray-500 mt-1">{percentage}% complete</p>
    </div>
  )
}
