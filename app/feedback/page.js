'use client'
import { useAuth, useFeedback } from '@/hooks/useSupabase'
import Link from 'next/link'

const ADMIN_EMAIL = 'bertmill19@gmail.com'

export default function FeedbackPage() {
  const { user, loading: authLoading } = useAuth()
  const { feedback, loading: feedbackLoading, markAsAddressed } = useFeedback()

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    )
  }

  // Check if user is the admin
  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-gray-800 rounded-xl p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-6">
            You don&apos;t have permission to view this page.
          </p>
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-medium transition-colors"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Feedback</h1>
          <p className="text-gray-400 mt-1">User feedback and suggestions</p>
        </div>
        <Link
          href="/"
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
        >
          Back to App
        </Link>
      </header>

      {feedbackLoading ? (
        <div className="text-center text-gray-400 py-8">Loading feedback...</div>
      ) : feedback.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-8 text-center">
          <p className="text-gray-400">No feedback yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {feedback.map((item) => (
            <div
              key={item.id}
              className={`bg-gray-800 rounded-xl p-6 transition-opacity ${item.addressed ? 'opacity-60' : ''}`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm text-purple-400">
                  {item.user_email || 'Anonymous'}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(item.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <p className={`whitespace-pre-wrap mb-4 ${item.addressed ? 'text-gray-400 line-through' : 'text-gray-200'}`}>
                {item.message}
              </p>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.addressed || false}
                  onChange={(e) => markAsAddressed(item.id, e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-green-500 focus:ring-green-500 focus:ring-offset-gray-800"
                />
                <span className={`text-sm ${item.addressed ? 'text-green-400' : 'text-gray-400'}`}>
                  {item.addressed ? 'Addressed' : 'Mark as addressed'}
                </span>
              </label>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
