import type { ReactNode } from 'react'
import { ThemeProvider } from '../../shared/context'
import { useAuthInit } from '../../shared/hooks/useAuth'

/**
 * Root providers wrapper component
 * Combines all application-level providers (Redux, Theme, etc.)
 */
export interface AppProvidersProps {
  children: ReactNode
}

/**
 * Auth Initializer Component
 */
function AuthInitializer({ children }: { children: ReactNode }) {
  useAuthInit()
  return <>{children}</>
}

/**
 * AppProviders component wraps the entire application with necessary context providers
 * This is the single entry point for all global application providers
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <AuthInitializer>
        {/* Add your providers here:
            - Redux Provider
            - Router Provider
            - Modal Provider
            - Toast/Notification Provider
        */}
        {children}
      </AuthInitializer>
    </ThemeProvider>
  )
}
