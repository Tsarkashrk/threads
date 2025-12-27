/**
 * Posts Store (Zustand)
 * Manages posts state and pagination
 */

import { create } from 'zustand'
import { PostsAPI } from '../api/posts'
import type { Post, PostsListParams, PostsSearchParams } from '../../entities/post'

export interface PostsState {
  // State
  posts: Post[]
  currentPost: Post | null
  total: number
  skip: number
  limit: number
  isLoading: boolean
  error: string | null
  searchQuery: string

  // Actions
  fetchPosts: (params?: PostsListParams) => Promise<void>
  fetchPostById: (id: number) => Promise<void>
  searchPosts: (params: PostsSearchParams) => Promise<void>
  fetchUserPosts: (userId: number, params?: PostsListParams) => Promise<void>
  setSearchQuery: (query: string) => void
  clearError: () => void
  resetPosts: () => void
}

const LIMIT = 20

export const usePostsStore = create<PostsState>((set) => ({
  // Initial state
  posts: [],
  currentPost: null,
  total: 0,
  skip: 0,
  limit: LIMIT,
  isLoading: false,
  error: null,
  searchQuery: '',

  // Fetch all posts
  fetchPosts: async (params?: PostsListParams) => {
    set({ isLoading: true, error: null })
    try {
      const response = await PostsAPI.getAllPosts({
        limit: params?.limit || LIMIT,
        skip: params?.skip || 0,
      })

      set({
        posts: response.posts,
        total: response.total,
        skip: response.skip,
        limit: response.limit,
        isLoading: false,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch posts'
      set({
        error: errorMessage,
        isLoading: false,
      })
      throw error
    }
  },

  // Fetch single post
  fetchPostById: async (id: number) => {
    set({ isLoading: true, error: null })
    try {
      const post = await PostsAPI.getPostById(id)
      set({
        currentPost: post,
        isLoading: false,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch post'
      set({
        error: errorMessage,
        isLoading: false,
      })
      throw error
    }
  },

  // Search posts
  searchPosts: async (params: PostsSearchParams) => {
    set({ isLoading: true, error: null, searchQuery: params.q })
    try {
      const response = await PostsAPI.searchPosts({
        q: params.q,
        limit: params.limit || LIMIT,
        skip: params.skip || 0,
      })

      set({
        posts: response.posts,
        total: response.total,
        skip: response.skip,
        limit: response.limit,
        isLoading: false,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Search failed'
      set({
        error: errorMessage,
        isLoading: false,
      })
      throw error
    }
  },

  // Fetch user posts
  fetchUserPosts: async (userId: number, params?: PostsListParams) => {
    set({ isLoading: true, error: null })
    try {
      const response = await PostsAPI.getPostsByUserId(userId, {
        limit: params?.limit || LIMIT,
        skip: params?.skip || 0,
      })

      set({
        posts: response.posts,
        total: response.total,
        skip: response.skip,
        limit: response.limit,
        isLoading: false,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user posts'
      set({
        error: errorMessage,
        isLoading: false,
      })
      throw error
    }
  },

  // Set search query
  setSearchQuery: (query: string) => {
    set({ searchQuery: query })
  },

  // Clear error
  clearError: () => {
    set({ error: null })
  },

  // Reset posts
  resetPosts: () => {
    set({
      posts: [],
      currentPost: null,
      total: 0,
      skip: 0,
      searchQuery: '',
      error: null,
    })
  },
}))
