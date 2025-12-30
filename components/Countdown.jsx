'use client'
import { differenceInDays } from 'date-fns'
import { RACE_DATE } from '@/data/trainingData'

export default function Countdown() {
  const today = new Date()
  const daysRemaining = differenceInDays(RACE_DATE, today)

  return (
    <div className="bg-gradient-card border border-dark-border rounded-2xl p-6 text-center shadow-xl">
      <p className="text-sm uppercase tracking-wide text-gray-400 font-medium">Race Day</p>
      <p className="text-5xl font-bold my-3 text-white">{daysRemaining}</p>
      <p className="text-sm text-gray-400">days until May 15, 2026</p>
    </div>
  )
}
