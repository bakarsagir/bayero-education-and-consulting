import { ReactNode, useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import { AuthContext, createAuth } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null)
  const auth = createAuth()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ ...auth, session }}>
      {children}
    </AuthContext.Provider>
  )
}