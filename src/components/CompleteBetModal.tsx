import type { Bet } from '../types/bet'

interface CompleteBetModalProps {
  bet: Bet
  onComplete: (won: boolean) => void
  onClose: () => void
}

export function CompleteBetModal({ bet, onComplete, onClose }: CompleteBetModalProps) {
  const potentialWin = bet.stake * bet.odds

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Completar apuesta</h3>
        <div className="modal-bet-info">
          {bet.apuesta && <p><strong>{bet.apuesta}</strong></p>}
          <p>Importe: {bet.stake.toFixed(2)} € · Cuota: {bet.odds.toFixed(2)}</p>
          <p className="potential-win">Ganancia potencial: {potentialWin.toFixed(2)} €</p>
        </div>
        <p className="modal-question">¿Cuál fue el resultado?</p>
        <div className="modal-actions">
          <button className="btn btn-won" onClick={() => onComplete(true)}>
            Ganada
          </button>
          <button className="btn btn-lost" onClick={() => onComplete(false)}>
            Perdida
          </button>
          <button className="btn btn-ghost" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
