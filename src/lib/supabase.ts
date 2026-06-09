import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://mhaedzsjmcxamzroaede.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oYWVkenNqbWN4YW16cm9hZWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMDQ3NjMsImV4cCI6MjA5NjU4MDc2M30.FV932SHqRrqm2m4stRGwEmdnTRCssrKEcn_wV5IzrV0"
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
