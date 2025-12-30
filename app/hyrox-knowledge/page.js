'use client'
import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

export default function HyroxKnowledge() {
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setStreamingContent('')

    try {
      const response = await fetch('/api/hyrox-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage]
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
    "What are the 8 Hyrox stations?",
    "How should I pace a Hyrox race?",
    "What's the difference between Hyrox divisions?",
    "How do I train for Hyrox?"
  ]

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Hyrox Knowledge</h1>
        <p className="text-gray-400 text-sm">Ask me anything about Hyrox racing, training, and strategy</p>
      </header>

      {/* Chat Container */}
      <div className="bg-gradient-card border border-dark-border rounded-2xl overflow-hidden shadow-xl">
        {/* Messages Area */}
        <div className="h-[calc(100vh-280px)] overflow-y-auto p-6 bg-dark-bg/50 space-y-4">
          {messages.length === 0 && !streamingContent ? (
            <div className="text-center text-gray-400 py-8">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-primary-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-lg mb-6">Welcome to your Hyrox knowledge base!</p>
              <p className="text-sm mb-6">Get started with a question below:</p>
              <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(q)}
                    className="text-sm bg-dark-card hover:bg-dark-cardHover border border-dark-border text-gray-300 px-4 py-2.5 rounded-xl transition-all hover:scale-105"
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
                    className={`max-w-[85%] rounded-xl px-5 py-4 ${
                      msg.role === 'user'
                        ? 'bg-gradient-primary text-white shadow-lg'
                        : 'bg-dark-card border border-dark-border text-gray-200'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown
                          components={{
                            h1: ({ children }) => <h1 className="text-xl font-bold mt-4 mb-3 text-white">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-lg font-bold mt-4 mb-2 text-white">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-base font-semibold mt-3 mb-2 text-white">{children}</h3>,
                            h4: ({ children }) => <h4 className="text-sm font-semibold mt-2 mb-1 text-white">{children}</h4>,
                            p: ({ children }) => <p className="mb-3 last:mb-0 text-gray-300 leading-relaxed">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-1.5">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 space-y-1.5">{children}</ol>,
                            li: ({ children }) => <li className="text-gray-300">{children}</li>,
                            strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                            em: ({ children }) => <em className="italic text-primary-300">{children}</em>,
                            code: ({ children }) => <code className="bg-dark-bg px-1.5 py-0.5 rounded text-primary-400 text-sm">{children}</code>,
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
                  <div className="max-w-[85%] rounded-xl px-5 py-4 bg-dark-card border border-dark-border text-gray-200">
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown
                        components={{
                          h1: ({ children }) => <h1 className="text-xl font-bold mt-4 mb-3 text-white">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-lg font-bold mt-4 mb-2 text-white">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-base font-semibold mt-3 mb-2 text-white">{children}</h3>,
                          h4: ({ children }) => <h4 className="text-sm font-semibold mt-2 mb-1 text-white">{children}</h4>,
                          p: ({ children }) => <p className="mb-3 last:mb-0 text-gray-300 leading-relaxed">{children}</p>,
                          ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-1.5">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 space-y-1.5">{children}</ol>,
                          li: ({ children }) => <li className="text-gray-300">{children}</li>,
                          strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                          em: ({ children }) => <em className="italic text-primary-300">{children}</em>,
                          code: ({ children }) => <code className="bg-dark-bg px-1.5 py-0.5 rounded text-primary-400 text-sm">{children}</code>,
                        }}
                      >
                        {streamingContent}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              )}
              {/* Loading dots */}
              {isLoading && !streamingContent && (
                <div className="flex justify-start">
                  <div className="bg-dark-card border border-dark-border rounded-xl px-5 py-4">
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

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 bg-dark-card border-t border-dark-border">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Hyrox..."
              className="flex-1 px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-gradient-primary text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 shadow-lg"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
