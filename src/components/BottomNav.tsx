
import { Link, useLocation } from 'react-router-dom'
import { Trophy, BarChart3, Plus, House } from 'lucide-react'
export function BottomNav() {
  const location = useLocation()

  const items = [
    {
      path: '/',
      icon: House,
      label: 'Inicio',
    },
    {
      path: '/bets',
      icon: Trophy,
      label: 'Apuestas',
    },
    {
      path: '/new-bet',
      icon: Plus,
      label: 'Nueva',
    },
    {
      path: '/resultados',
      icon: BarChart3,
      label: 'Resultados',
    },
  ]

  return (
    <nav className="bottom-nav">
      {items.map(({ path, icon: Icon, label }) => (
        <Link
          key={path}
          to={path}
          className={`bottom-nav-item ${
            location.pathname === path ? 'active' : ''
          }`}
        >
          <Icon size={24} />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  )
}