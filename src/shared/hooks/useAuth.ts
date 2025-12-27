/**
 * Auth Hooks
 * Custom hooks for accessing auth state
 */

import { useEffect } from 'react'
import { useAuthStore } from '../store/auth'

/**
 * Hook to use auth store
 */
export function useAuth() {
  return useAuthStore()
}

/**
 * Hook to get current user
 */
export function useCurrentUser() {
  const { user, isAuthenticated } = useAuthStore()
  return { user, isAuthenticated }
}

/**
 * Hook to check if user is authenticated
 */
export function useIsAuthenticated() {
  return useAuthStore((state) => state.isAuthenticated)
}

/**
 * Hook to get access token
 */
export function useAccessToken() {
  return useAuthStore((state) => state.accessToken)
}

/**
 * Hook to initialize auth on app load
 */
export function useAuthInit() {
  const { isAuthenticated, accessToken, fetchCurrentUser } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      // Try to fetch current user on init
      fetchCurrentUser().catch(() => {
        // User might not be authenticated anymore
      })
    }
  }, [isAuthenticated, accessToken, fetchCurrentUser])
}
