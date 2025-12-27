/**
 * Auth API Service
 * DummyJSON authentication endpoints
 */

export interface AuthLoginRequest {
  username: string
  password: string
  expiresInMins?: number
}

export interface AuthUser {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}

export interface AuthLoginResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

export interface AuthRefreshRequest {
  refreshToken?: string
  expiresInMins?: number
}

export interface AuthRefreshResponse {
  accessToken: string
  refreshToken: string
}

export interface UpdateUserRequest {
  firstName?: string
  lastName?: string
  email?: string
  gender?: string
  image?: string
  phone?: string
}

const API_URL = 'https://dummyjson.com/auth'

export class AuthAPI {
  /**
   * Login user with username and password
   */
  static async login(request: AuthLoginRequest): Promise<AuthLoginResponse> {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: request.username,
          password: request.password,
          expiresInMins: request.expiresInMins || 60,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Login failed')
      }

      return await response.json()
    } catch (error) {
      throw new Error(`Authentication error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Get current authenticated user
   */
  static async getMe(accessToken: string): Promise<AuthUser> {
    try {
      const response = await fetch(`${API_URL}/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch current user')
      }

      return await response.json()
    } catch (error) {
      throw new Error(`Failed to get user: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Refresh authentication tokens
   */
  static async refresh(request?: AuthRefreshRequest): Promise<AuthRefreshResponse> {
    try {
      const response = await fetch(`${API_URL}/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refreshToken: request?.refreshToken,
          expiresInMins: request?.expiresInMins || 60,
        }),
      })

      if (!response.ok) {
        throw new Error('Token refresh failed')
      }

      return await response.json()
    } catch (error) {
      throw new Error(`Token refresh error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Update user profile information
   */
  static async updateUser(userId: number, data: UpdateUserRequest): Promise<AuthUser> {
    try {
      const response = await fetch(`https://dummyjson.com/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update user')
      }

      return await response.json()
    } catch (error) {
      throw new Error(`User update error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}
