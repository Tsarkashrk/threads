/**
 * Auth Store (Zustand)
 * Manages authentication state and user data
 */

import { create } from 'zustand'
import { AuthAPI, type AuthLoginRequest, type AuthUser, type UpdateUserRequest } from '../api/auth'

export interface AuthState {
  // State
  user: AuthUser | null
  accessToken: string | null
  refreshToken: string | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean

  // Actions
  login: (credentials: AuthLoginRequest) => Promise<void>
  logout: () => void
  refreshTokens: () => Promise<void>
  fetchCurrentUser: () => Promise<void>
  updateUser: (data: UpdateUserRequest) => Promise<void>
  setTokens: (accessToken: string, refreshToken: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isLoading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('accessToken'),

  // Login action
  login: async (credentials: AuthLoginRequest) => {
    set({ isLoading: true, error: null })
    try {
      const response = await AuthAPI.login(credentials)

      // Store tokens
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('refreshToken', response.refreshToken)

      // Extract user data from response
      const user: AuthUser = {
        id: response.id,
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        gender: response.gender,
        image: response.image,
      }

      set({
        user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      set({
        error: errorMessage,
        isLoading: false,
        isAuthenticated: false,
      })
      throw error
    }
  },

  // Logout action
  logout: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      error: null,
    })
  },

  // Refresh tokens action
  refreshTokens: async () => {
    const state = get()
    if (!state.refreshToken) {
      throw new Error('No refresh token available')
    }

    set({ isLoading: true, error: null })
    try {
      const response = await AuthAPI.refresh({
        refreshToken: state.refreshToken,
      })

      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('refreshToken', response.refreshToken)

      set({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        isLoading: false,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Token refresh failed'
      set({
        error: errorMessage,
        isLoading: false,
        isAuthenticated: false,
      })
      // Clear auth on refresh failure
      get().clearAuth()
      throw error
    }
  },

  // Fetch current user action
  fetchCurrentUser: async () => {
    const state = get()
    if (!state.accessToken) {
      throw new Error('No access token available')
    }

    set({ isLoading: true, error: null })
    try {
      const user = await AuthAPI.getMe(state.accessToken)
      set({
        user,
        isLoading: false,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user'
      set({
        error: errorMessage,
        isLoading: false,
      })
      // Try to refresh token on error
      try {
        await get().refreshTokens()
        const newToken = get().accessToken
        if (newToken) {
          const user = await AuthAPI.getMe(newToken)
          set({ user })
        }
      } catch {
        get().clearAuth()
      }
    }
  },

  // Update user profile action
  updateUser: async (data: UpdateUserRequest) => {
    const state = get()
    if (!state.user) {
      throw new Error('No user logged in')
    }

    set({ isLoading: true, error: null })
    try {
      const updatedUser = await AuthAPI.updateUser(state.user.id, data)
      set({
        user: updatedUser,
        isLoading: false,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update user'
      set({
        error: errorMessage,
        isLoading: false,
      })
      throw error
    }
  },

  // Set tokens action
  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    set({
      accessToken,
      refreshToken,
      isAuthenticated: true,
    })
  },

  // Clear auth action
  clearAuth: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      error: null,
    })
  },
}))
