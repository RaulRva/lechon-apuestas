import { useState } from 'react'
import { useBets } from './hooks/useBets'
import { BetForm } from './components/BetForm'
import { BetCard } from './components/BetCard'
import { CompleteBetModal } from './components/CompleteBetModal'
import { Stats } from './components/Stats'
import type { Bet } from './types/bet'
import { Routes, Route, Navigate } from 'react-router-dom'
import { BottomNav } from './components/BottomNav'


import './App.css'

function App() {
  const {
    pendingBets,
    completedBets,
    addBet,
    completeBet,
    deleteBet,
    stats,
    loading,
    error,
    reload,
  } = useBets()
  const [completingBet, setCompletingBet] = useState<Bet | null>(null)
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending')
  const [actionError, setActionError] = useState<string | null>(null)

  const handleAddBet = async (data: Parameters<typeof addBet>[0]) => {
    try {
      setActionError(null)
      await addBet(data)
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Error al guardar la apuesta')
      throw err
    }
  }

  const handleComplete = async (won: boolean) => {
    if (!completingBet) return
    try {
      setActionError(null)
      await completeBet(completingBet.id, won)
      setCompletingBet(null)
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Error al completar la apuesta')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setActionError(null)
      await deleteBet(id)
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Error al eliminar la apuesta')
    }
  }

  const displayedBets = activeTab === 'pending' ? pendingBets : completedBets

  if (loading) {
    return (
      <div className="app">
        <div className="loading-state">Cargando apuestas...</div>
      </div>
    )
  }

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <header className="app-header">
                <h1>Orejón</h1>
                <p className="app-subtitle">
                  La tienes pequeña, mejor no te pases apostando
                </p>
              </header>
              <div className="app-content">
                <img src="/orejon.jpg" alt="Orejón" />
              </div>
            </>
          }
        />
        <Route
          path="/bets"
          element={
            <>
              {(error || actionError) && (
                <div className="error-banner">
                  <p>{error || actionError}</p>
                  {error && (
                    <button className="btn btn-ghost" onClick={reload}>
                      Reintentar
                    </button>
                  )}
                </div>
              )}
  
              <section className="bets-section">
                <div className="tabs">
                  <button
                    className={`tab ${
                      activeTab === 'pending' ? 'tab--active' : ''
                    }`}
                    onClick={() => setActiveTab('pending')}
                  >
                    Pendientes ({pendingBets.length})
                  </button>
  
                  <button
                    className={`tab ${
                      activeTab === 'completed' ? 'tab--active' : ''
                    }`}
                    onClick={() => setActiveTab('completed')}
                  >
                    Completadas ({completedBets.length})
                  </button>
                </div>
  
                {displayedBets.length === 0 ? (
                  <p className="empty-state">
                    {activeTab === 'pending'
                      ? 'No tienes apuestas pendientes. ¡Añade una nueva!'
                      : 'Aún no has completado ninguna apuesta.'}
                  </p>
                ) : (
                  <div className="bet-list">
                    {displayedBets.map((bet) => (
                      <BetCard
                        key={bet.id}
                        bet={bet}
                        onComplete={
                          bet.status === 'pending'
                            ? () => setCompletingBet(bet)
                            : undefined
                        }
                        onDelete={() => handleDelete(bet.id)}
                      />
                    ))}
                  </div>
                )}
              </section>
            </>
          }
        />
  
        <Route
          path="/resultados"
          element={<Stats stats={stats} />}
        />
  
        <Route
          path="/new-bet"
          element={
            <BetForm
              onSubmit={handleAddBet}
              disabled={!!error}
            />
          }
        />
  
        <Route path="*" element={<Navigate to="/bets" replace />} />
      </Routes>
  
      <BottomNav />
  
      {completingBet && (
        <CompleteBetModal
          bet={completingBet}
          onComplete={handleComplete}
          onClose={() => setCompletingBet(null)}
        />
      )}
    </div>
  )
}

export default App
