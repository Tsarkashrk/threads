/**
 * Sidebar Widget
 * Main navigation sidebar like Threads
 */

import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, Search, Heart, MessageCircle, User, Settings, Menu, X, Moon, Sun, LogOut } from 'lucide-react'
import { useTheme } from '../../shared/context'
import { useAuth } from '../../shared/hooks/useAuth'
import { Button, ThreadsIcon } from '../../shared'

interface NavItem {
  id: string
  icon: React.ReactNode
  label: string
  path: string
  badge?: number
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { logout } = useAuth()

  // Icon color based on theme
  const iconColor = theme === 'light' ? '#000000' : '#FFFFFF'

  const navItems: NavItem[] = [
    {
      id: 'home',
      icon: <Home size={24} color={iconColor} />,
      label: 'Home',
      path: '/',
    },
    {
      id: 'explore',
      icon: <Search size={24} color={iconColor} />,
      label: 'Explore',
      path: '/explore',
    },
    {
      id: 'likes',
      icon: <Heart size={24} color={iconColor} />,
      label: 'Likes',
      path: '/likes',
      badge: 5,
    },
    {
      id: 'messages',
      icon: <MessageCircle size={24} color={iconColor} />,
      label: 'Messages',
      path: '/messages',
      badge: 3,
    },
    {
      id: 'profile',
      icon: <User size={24} color={iconColor} />,
      label: 'Profile',
      path: '/profile',
    },
    {
      id: 'settings',
      icon: <Settings size={24} color={iconColor} />,
      label: 'Settings',
      path: '/settings',
    },
  ]

  const isActive = (path: string) => location.pathname === path

  const getNavItemIcon = (item: NavItem) => {
    const iconProps = {
      size: 24,
      color: iconColor,
    }

    switch (item.id) {
      case 'home':
        return <Home {...iconProps} />
      case 'explore':
        return <Search {...iconProps} />
      case 'likes':
        return <Heart {...iconProps} />
      case 'messages':
        return <MessageCircle {...iconProps} />
      case 'profile':
        return <User {...iconProps} />
      case 'settings':
        return <Settings {...iconProps} />
      default:
        return <Home {...iconProps} />
    }
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="fixed top-4 left-4 z-50 lg:hidden p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
        {isOpen ? <X size={24} className="text-gray-900 dark:text-white" /> : <Menu size={24} className="text-gray-900 dark:text-white" />}
      </button>

      {/* Sidebar */}
      <aside data-testid="sidebar" className={`fixed left-0 top-0 h-full w-20 transition-transform duration-300 ease-in-out z-40 lg:z-auto lg:translate-x-0 flex flex-col items-center ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Header with Logo */}
        <div className="h-16 flex items-center justify-center w-full">
          <Link to="/" className="flex items-center justify-center p-2 rounded-lg  transition-colors">
            <ThreadsIcon fill={iconColor} />
          </Link>
        </div>

        {/* Navigation */}
        <nav data-testid="sidebar-nav" className="flex-1 w-full flex flex-col items-center gap-2 px-2 py-6">
          {navItems.map((item) => (
            <div key={item.id} className="relative group">
              <Link
                data-testid={`nav-link-${item.id}`}
                to={item.path}
                onClick={() => setIsOpen(false)}
                title={item.label}
                className={`flex items-center justify-center p-3 rounded-lg transition-colors relative
    ${isActive(item.path) ? `${theme === 'light' ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-800 text-white'}` : `${theme === 'light' ? 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900' : 'text-gray-300 hover:bg-zinc-800 hover:text-white'}`}`}>
                <span className="shrink-0">{getNavItemIcon(item)}</span>

                {/* Badge */}
                {item.badge && <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">{item.badge}</span>}
              </Link>

              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-3 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden lg:block">{item.label}</div>
            </div>
          ))}
        </nav>

        {/* Footer with Create and Theme Toggle Buttons */}
        <div className="w-full p-2 flex flex-col gap-2 justify-center items-center">
          <Button data-testid="theme-toggle" onClick={toggleTheme} className={`flex items-center justify-center p-3 rounded-lg transition-colors relative ${theme === 'light' ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-800 text-white'}`}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </Button>

          <Button
            data-testid="logout-button"
            onClick={() => {
              logout()
              navigate('/login')
            }}
            className="p-3 text-gray-600 dark:text-gray-400 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors flex items-center justify-center shrink-0 w-full">
            <LogOut size={20} />
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
