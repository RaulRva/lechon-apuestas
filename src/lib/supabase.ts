import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = createClient(
  supabaseUrl ?? '',
  supabaseAnonKey ?? ''
)

export interface BetRow {
  id: string
  apuesta: string | null
  stake: number
  odds: number
  status: 'pending' | 'won' | 'lost'
  created_at: string
  completed_at: string | null
}
