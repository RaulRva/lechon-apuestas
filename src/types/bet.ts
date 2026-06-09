export type BetStatus = 'pending' | 'won' | 'lost'

export interface Bet {
  id: string
  apuesta?: string
  stake: number
  odds: number
  status: BetStatus
  createdAt: string
  completedAt?: string
}

export interface BetFormData {
  apuesta?: string
  stake: number
  odds: number
}
