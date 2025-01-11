import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Create a singleton instance
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage
  },
  global: {
    headers: {
      'x-application-name': 'bayero-education'
    }
  }
})

// Re-export types for convenience
export type Tables = Database['public']['Tables']
export type University = Tables['universities']['Row']
export type Program = Tables['programs']['Row']
export type Course = Tables['courses']['Row']
export type TuitionFee = Tables['tuition_fees']['Row']
export type Scholarship = Tables['scholarships']['Row']