'use client'
import { differenceInDays } from 'date-fns'
import { RACE_DATE } from '@/data/trainingData'

export default function Countdown() {
  const today = new Date()
  const daysRemaining = differenceInDays(RACE_DATE, today)

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-center">
      <p className="text-sm uppercase tracking-wide text-purple-200">Race Day</p>
      <p className="text-4xl font-bold my-2">{daysRemaining}</p>
      <p className="text-sm text-purple-200">days until May 15, 2026</p>
    </div>
  )
}
