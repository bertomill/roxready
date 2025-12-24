'use client'
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

export function useCompletedSessions(userId) {
  const [completedSessions, setCompletedSessions] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch completed sessions from Supabase
  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchSessions = async () => {
      const { data, error } = await supabase
        .from('completed_sessions')
        .select('session_id')
        .eq('user_id', userId)

      if (error) {
        console.error('Error fetching sessions:', error)
      } else {
        setCompletedSessions(data.map(row => row.session_id))
      }
      setLoading(false)
    }

    fetchSessions()

    // Subscribe to real-time changes
    const channel = supabase
      .channel('completed_sessions_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'completed_sessions',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setCompletedSessions(prev => [...prev, payload.new.session_id])
          } else if (payload.eventType === 'DELETE') {
            setCompletedSessions(prev => prev.filter(id => id !== payload.old.session_id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  const toggleSession = useCallback(async (sessionId) => {
    if (!userId) return

    const isCompleted = completedSessions.includes(sessionId)

    if (isCompleted) {
      // Remove from completed
      const { error } = await supabase
        .from('completed_sessions')
        .delete()
        .eq('user_id', userId)
        .eq('session_id', sessionId)

      if (error) {
        console.error('Error removing session:', error)
      } else {
        setCompletedSessions(prev => prev.filter(id => id !== sessionId))
      }
    } else {
      // Add to completed
      const { error } = await supabase
        .from('completed_sessions')
        .insert({ user_id: userId, session_id: sessionId })

      if (error) {
        console.error('Error adding session:', error)
      } else {
        setCompletedSessions(prev => [...prev, sessionId])
      }
    }
  }, [userId, completedSessions])

  return { completedSessions, toggleSession, loading }
}

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return { user, loading, signOut }
}
