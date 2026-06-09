import type { Bet } from '../types/bet'

interface BetCardProps {
  bet: Bet
  onComplete?: () => void
  onDelete: () => void
}

const statusLabels: Record<Bet['status'], string> = {
  pending: 'Pendiente',
  won: 'Ganada',
  lost: 'Perdida',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function BetCard({ bet, onComplete, onDelete }: BetCardProps) {
  const profit =
    bet.status === 'won'
      ? bet.stake * (bet.odds - 1)
      : bet.status === 'lost'
        ? -bet.stake
        : null

  return (
    <article className={`bet-card bet-card--${bet.status}`}>
      <div className="bet-card-header">
        <span className={`badge badge--${bet.status}`}>{statusLabels[bet.status]}</span>
        <button className="btn-icon" onClick={onDelete} title="Eliminar">
          ×
        </button>
      </div>
      {bet.apuesta && <h3 className="bet-card-apuesta">{bet.apuesta}</h3>}
      <div className="bet-card-details">
        <span>Importe: <strong>{bet.stake.toFixed(2)} €</strong></span>
        <span>Cuota: <strong>{bet.odds.toFixed(2)}</strong></span>
        {profit !== null && (
          <span className={profit >= 0 ? 'profit-positive' : 'profit-negative'}>
            {profit >= 0 ? '+' : ''}{profit.toFixed(2)} €
          </span>
        )}
      </div>
      <p className="bet-card-date">{formatDate(bet.createdAt)}</p>
      {bet.status === 'pending' && onComplete && (
        <button className="btn btn-complete" onClick={onComplete}>
          Completar
        </button>
      )}
    </article>
  )
}
