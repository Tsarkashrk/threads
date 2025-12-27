/**
 * Main Layout Component
 * Wrapper for pages with sidebar
 */

import { useLocation } from 'react-router-dom'
import { useTheme } from '../../shared'
import { Sidebar } from '../../widgets'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { theme } = useTheme()
  const location = useLocation()

  // Don't show sidebar on login page
  const isLoginPage = location.pathname === '/login'

  return (
    <div
      style={{
        backgroundColor: theme === 'light' ? '#FFFFFF' : '#000000',
      }}
      className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar - only show when not on login page */}
      {!isLoginPage && <Sidebar />}

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto w-full ${!isLoginPage ? 'lg:ml-20' : ''}`}>{children}</main>
    </div>
  )
}
