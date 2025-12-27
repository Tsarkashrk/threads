/**
 * Users Store Slice
 * Manages user data, profiles, and user-related operations
 */

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

/**
 * User type definition
 */
export interface User {
  id: string
  username: string
  displayName: string
  avatar: string
  bio: string
  followersCount: number
  followingCount: number
  postsCount: number
  isFollowing: boolean
  createdAt: string
}

/**
 * Users state interface
 */
export interface UsersState {
  users: User[]
  currentUser: User | null
  selectedUser: User | null
  loading: boolean
  error: string | null

  // Actions
  setUsers: (users: User[]) => void
  addUser: (user: User) => void
  removeUser: (userId: string) => void
  updateUser: (userId: string, updates: Partial<User>) => void
  setCurrentUser: (user: User | null) => void
  setSelectedUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  getUserById: (userId: string) => User | undefined
  getUserByUsername: (username: string) => User | undefined
  followUser: (userId: string) => void
  unfollowUser: (userId: string) => void
}

/**
 * Zustand store for users management
 */
export const useUsersStore = create<UsersState>()(
  devtools(
    persist(
      (set, get) => ({
        users: [],
        currentUser: null,
        selectedUser: null,
        loading: false,
        error: null,

        /**
         * Set all users
         */
        setUsers: (users: User[]) => set({ users }),

        /**
         * Add a new user
         */
        addUser: (user: User) =>
          set((state) => ({
            users: [...state.users, user],
          })),

        /**
         * Remove a user by ID
         */
        removeUser: (userId: string) =>
          set((state) => ({
            users: state.users.filter((user) => user.id !== userId),
          })),

        /**
         * Update a user's data
         */
        updateUser: (userId: string, updates: Partial<User>) =>
          set((state) => ({
            users: state.users.map((user) => (user.id === userId ? { ...user, ...updates } : user)),
            currentUser: state.currentUser?.id === userId ? { ...state.currentUser, ...updates } : state.currentUser,
            selectedUser: state.selectedUser?.id === userId ? { ...state.selectedUser, ...updates } : state.selectedUser,
          })),

        /**
         * Set the current logged-in user
         */
        setCurrentUser: (user: User | null) => set({ currentUser: user }),

        /**
         * Set the currently selected/viewed user
         */
        setSelectedUser: (user: User | null) => set({ selectedUser: user }),

        /**
         * Set loading state
         */
        setLoading: (loading: boolean) => set({ loading }),

        /**
         * Set error message
         */
        setError: (error: string | null) => set({ error }),

        /**
         * Get user by ID
         */
        getUserById: (userId: string) => {
          const { users } = get()
          return users.find((user) => user.id === userId)
        },

        /**
         * Get user by username
         */
        getUserByUsername: (username: string) => {
          const { users } = get()
          return users.find((user) => user.username === username)
        },

        /**
         * Follow a user
         */
        followUser: (userId: string) => {
          const { updateUser: update } = get()
          const user = get().getUserById(userId)
          if (user) {
            update(userId, {
              isFollowing: true,
              followersCount: user.followersCount + 1,
            })
          }
        },

        /**
         * Unfollow a user
         */
        unfollowUser: (userId: string) => {
          const { updateUser: update } = get()
          const user = get().getUserById(userId)
          if (user) {
            update(userId, {
              isFollowing: false,
              followersCount: Math.max(0, user.followersCount - 1),
            })
          }
        },
      }),
      {
        name: 'users-store',
      },
    ),
  ),
)
