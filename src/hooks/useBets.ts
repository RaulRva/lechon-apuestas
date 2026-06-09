import { useState, useEffect, useCallback } from 'react'
import type { Bet, BetFormData } from '../types/bet'
import { isSupabaseConfigured } from '../lib/supabase'
import * as betsService from '../services/bets'

const CONFIG_ERROR =
  'Configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu archivo .env'

export function useBets() {
  const [bets, setBets] = useState<Bet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadBets = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setError(CONFIG_ERROR)
      setLoading(false)
      return
    }

    try {
      setError(null)
      const data = await betsService.fetchBets()
      setBets(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar las apuestas')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadBets()
  }, [loadBets])

  const addBet = async (data: BetFormData) => {
    const bet = await betsService.createBet(data)
    setBets((prev) => [bet, ...prev])
    return bet
  }

  const completeBet = async (id: string, won: boolean) => {
    const bet = await betsService.updateBetResult(id, won)
    setBets((prev) => prev.map((b) => (b.id === id ? bet : b)))
    return bet
  }

  const deleteBet = async (id: string) => {
    await betsService.removeBet(id)
    setBets((prev) => prev.filter((bet) => bet.id !== id))
  }

  const pendingBets = bets.filter((b) => b.status === 'pending')
  const completedBets = bets.filter((b) => b.status !== 'pending')

  const totalStaked = completedBets.reduce((sum, b) => sum + b.stake, 0)
  const totalProfit = completedBets.reduce((sum, b) => {
    if (b.status === 'won') return sum + b.stake * (b.odds - 1)
    return sum - b.stake
  }, 0)
  const pendingStake = pendingBets.reduce((sum, b) => sum + b.stake, 0)

  return {
    bets,
    pendingBets,
    completedBets,
    loading,
    error,
    reload: loadBets,
    addBet,
    completeBet,
    deleteBet,
    stats: {
      total: bets.length,
      pending: pendingBets.length,
      won: completedBets.filter((b) => b.status === 'won').length,
      lost: completedBets.filter((b) => b.status === 'lost').length,
      totalStaked,
      totalProfit,
      pendingStake,
    },
  }
}
