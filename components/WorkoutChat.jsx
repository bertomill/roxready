'use client'
import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

export default function WorkoutChat({ session, isOpen, onToggle }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [streamingContent, setStreamingContent] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingContent])

  // Build workout context for AI
  const buildWorkoutContext = () => {
    if (!session) return ''

    let context = `Workout: ${session.title}\n`
    context += `Type: ${session.type}\n`
    context += `Duration: ${session.duration}\n`
    if (session.targetPace) context += `Target Pace: ${session.targetPace}\n`
    context += `Description: ${session.description}\n`

    if (session.details?.warmup) {
      context += `\nWarm-up: ${session.details.warmup}\n`
    }

    if (session.details?.main) {
      context += `\nMain Workout:\n`
      session.details.main.forEach(item => {
        context += `- ${item}\n`
      })
    }

    if (session.details?.notes) {
      context += `\nCoach Notes: ${session.details.notes}\n`
    }

    return context
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setStreamingContent('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          workoutContext: buildWorkoutContext()
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let fullContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        fullContent += chunk
        setStreamingContent(fullContent)
      }

      // Add complete message to messages array
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: fullContent
      }])
      setStreamingContent('')

    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I couldn\'t connect. Please try again.'
      }])
      setStreamingContent('')
    } finally {
      setIsLoading(false)
    }
  }

  const suggestedQuestions = [
    "How should I pace this workout?",
    "What's proper form for the main exercises?",
    "How can I modify this if I'm tired?",
    "What should I eat before this session?"
  ]

  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 px-5 bg-dark-card border border-dark-border hover:bg-dark-cardHover rounded-xl transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <span className="font-medium text-white">Ask AI Coach</span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-3 border border-dark-border rounded-xl overflow-hidden bg-gradient-card">
          {/* Chat Messages */}
          <div className="h-72 overflow-y-auto p-4 bg-dark-bg/50 space-y-4">
            {messages.length === 0 && !streamingContent ? (
              <div className="text-center text-gray-400 py-4">
                <p className="text-sm mb-3">Ask me anything about this workout!</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(q)}
                      className="text-xs bg-dark-card hover:bg-dark-cardHover border border-dark-border text-gray-300 px-3 py-1.5 rounded-full transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[90%] rounded-xl px-4 py-3 ${
                        msg.role === 'user'
                          ? 'bg-gradient-primary text-white shadow-lg'
                          : 'bg-dark-card border border-dark-border text-gray-200'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        <div className="prose prose-sm max-w-none">
                          <ReactMarkdown
                            components={{
                              h3: ({ children }) => <h3 className="text-base font-semibold mt-3 mb-2 text-white">{children}</h3>,
                              h4: ({ children }) => <h4 className="text-sm font-semibold mt-2 mb-1 text-white">{children}</h4>,
                              p: ({ children }) => <p className="mb-2 last:mb-0 text-gray-300">{children}</p>,
                              ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                              li: ({ children }) => <li className="text-gray-300">{children}</li>,
                              strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <span className="text-sm">{msg.content}</span>
                      )}
                    </div>
                  </div>
                ))}
                {/* Streaming content */}
                {streamingContent && (
                  <div className="flex justify-start">
                    <div className="max-w-[90%] rounded-xl px-4 py-3 bg-dark-card border border-dark-border text-gray-200">
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown
                          components={{
                            h3: ({ children }) => <h3 className="text-base font-semibold mt-3 mb-2 text-white">{children}</h3>,
                            h4: ({ children }) => <h4 className="text-sm font-semibold mt-2 mb-1 text-white">{children}</h4>,
                            p: ({ children }) => <p className="mb-2 last:mb-0 text-gray-300">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                            li: ({ children }) => <li className="text-gray-300">{children}</li>,
                            strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                          }}
                        >
                          {streamingContent}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                )}
                {/* Loading dots when waiting to start streaming */}
                {isLoading && !streamingContent && (
                  <div className="flex justify-start">
                    <div className="bg-dark-card border border-dark-border rounded-xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-dark-card border-t border-dark-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about this workout..."
                className="flex-1 px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-4 py-2 bg-gradient-primary text-white rounded-xl text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 shadow-lg"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
