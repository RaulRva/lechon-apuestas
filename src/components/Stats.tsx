interface StatsProps {
  stats: {
    total: number
    pending: number
    won: number
    lost: number
    totalStaked: number
    totalProfit: number
    pendingStake: number
  }
}

export function Stats({ stats }: StatsProps) {
  const profitClass = stats.totalProfit >= 0 ? 'profit-positive' : 'profit-negative'

  return (
    <section className="stats">
      <div className="stat-card stat-card--highlight">
        <span className="stat-label">Balance</span>
        <span className={`stat-value ${profitClass}`}>
          {stats.totalProfit >= 0 ? '+' : ''}{stats.totalProfit.toFixed(2)} €
        </span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Pendientes</span>
        <span className="stat-value">{stats.pending}</span>
        <span className="stat-sub">{stats.pendingStake.toFixed(2)} € en juego</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Ganadas</span>
        <span className="stat-value profit-positive">{stats.won}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Perdidas</span>
        <span className="stat-value profit-negative">{stats.lost}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Total apostado</span>
        <span className="stat-value">{stats.totalStaked.toFixed(2)} €</span>
      </div>
    </section>
  )
}
