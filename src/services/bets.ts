import { supabase, type BetRow } from '../lib/supabase'
import type { Bet, BetFormData } from '../types/bet'

function toBet(row: BetRow): Bet {
  return {
    id: row.id,
    apuesta: row.apuesta ?? undefined,
    stake: Number(row.stake),
    odds: Number(row.odds),
    status: row.status,
    createdAt: row.created_at,
    completedAt: row.completed_at ?? undefined,
  }
}

export async function fetchBets(): Promise<Bet[]> {
  const { data, error } = await supabase
    .from('bets')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data as BetRow[]).map(toBet)
}

export async function createBet(formData: BetFormData): Promise<Bet> {
  const { data, error } = await supabase
    .from('bets')
    .insert({
      apuesta: formData.apuesta ?? null,
      stake: formData.stake,
      odds: formData.odds,
      status: 'pending',
    })
    .select()
    .single()

  if (error) throw error
  return toBet(data as BetRow)
}

export async function updateBetResult(id: string, won: boolean): Promise<Bet> {
  const { data, error } = await supabase
    .from('bets')
    .update({
      status: won ? 'won' : 'lost',
      completed_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return toBet(data as BetRow)
}

export async function removeBet(id: string): Promise<void> {
  const { error } = await supabase.from('bets').delete().eq('id', id)
  if (error) throw error
}
