/**
 * useUser Hook
 * Manages user data fetching by ID
 */

import { useState, useEffect } from 'react'

export interface UserData {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  username: string
  image: string
  age: number
  gender: string
  company?: {
    name: string
    title: string
  }
}

export function useUser(userId: number | null) {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setUser(null)
      return
    }

    const fetchUser = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`https://dummyjson.com/users/${userId}`)
        const data: UserData = await response.json()
        setUser(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user')
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  return {
    user,
    isLoading,
    error,
  }
}
