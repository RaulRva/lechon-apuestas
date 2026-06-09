import { useState, type FormEvent } from 'react'
import type { BetFormData } from '../types/bet'

interface BetFormProps {
  onSubmit: (data: BetFormData) => Promise<void>
  disabled?: boolean
}

export function BetForm({ onSubmit, disabled }: BetFormProps) {
  const [apuesta, setApuesta] = useState('')
  const [stake, setStake] = useState('')
  const [odds, setOdds] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!stake || !odds || disabled) return

    setSubmitting(true)
    try {
      await onSubmit({
        apuesta: apuesta.trim() || undefined,
        stake: parseFloat(stake),
        odds: parseFloat(odds),
      })

      setApuesta('')
      setStake('')
      setOdds('')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="bet-form" onSubmit={handleSubmit}>
      <h2>Nueva apuesta</h2>
      <div className="form-grid">
        <div className="form-field form-field--full">
          <label htmlFor="apuesta">Apuesta</label>
          <input
            id="apuesta"
            type="text"
            placeholder="Ej: Real Madrid gana"
            value={apuesta}
            onChange={(e) => setApuesta(e.target.value)}
            disabled={disabled || submitting}
          />
        </div>
        <div className="form-field">
          <label htmlFor="stake">Importe (€)</label>
          <input
            id="stake"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="10.00"
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            disabled={disabled || submitting}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="odds">Cuota</label>
          <input
            id="odds"
            type="number"
            min="1.01"
            step="0.01"
            placeholder="2.50"
            value={odds}
            onChange={(e) => setOdds(e.target.value)}
            disabled={disabled || submitting}
            required
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary" disabled={disabled || submitting}>
        {submitting ? 'Guardando...' : 'Añadir apuesta'}
      </button>
    </form>
  )
}
