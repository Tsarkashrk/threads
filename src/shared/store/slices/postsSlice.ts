/**
 * Posts Store Slice
 * Manages posts data and post-related operations
 */

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

/**
 * Post type definition
 */
export interface Post {
  id: string
  authorId: string
  content: string
  images?: string[]
  likesCount: number
  commentsCount: number
  isLiked: boolean
  createdAt: string
  updatedAt: string
}

/**
 * Post with author info
 */
export interface PostWithAuthor extends Post {
  author: {
    id: string
    username: string
    displayName: string
    avatar: string
  }
}

/**
 * Posts state interface
 */
export interface PostsState {
  posts: Post[]
  selectedPost: Post | null
  filteredPosts: Post[]
  loading: boolean
  error: string | null

  // Actions
  setPosts: (posts: Post[]) => void
  addPost: (post: Post) => void
  removePost: (postId: string) => void
  updatePost: (postId: string, updates: Partial<Post>) => void
  setSelectedPost: (post: Post | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  getPostById: (postId: string) => Post | undefined
  getPostsByAuthor: (authorId: string) => Post[]
  likePost: (postId: string) => void
  unlikePost: (postId: string) => void
  addComment: (postId: string) => void
  removeComment: (postId: string) => void
  filterPostsByAuthor: (authorId: string) => void
  clearFilters: () => void
}

/**
 * Zustand store for posts management
 */
export const usePostsStore = create<PostsState>()(
  devtools(
    persist(
      (set, get) => ({
        posts: [],
        selectedPost: null,
        filteredPosts: [],
        loading: false,
        error: null,

        /**
         * Set all posts
         */
        setPosts: (posts: Post[]) => set({ posts, filteredPosts: posts }),

        /**
         * Add a new post
         */
        addPost: (post: Post) =>
          set((state) => {
            const newPosts = [post, ...state.posts]
            return {
              posts: newPosts,
              filteredPosts: newPosts,
            }
          }),

        /**
         * Remove a post by ID
         */
        removePost: (postId: string) =>
          set((state) => {
            const newPosts = state.posts.filter((post) => post.id !== postId)
            return {
              posts: newPosts,
              filteredPosts: newPosts,
              selectedPost: state.selectedPost?.id === postId ? null : state.selectedPost,
            }
          }),

        /**
         * Update a post's data
         */
        updatePost: (postId: string, updates: Partial<Post>) =>
          set((state) => {
            const newPosts = state.posts.map((post) => (post.id === postId ? { ...post, ...updates } : post))
            return {
              posts: newPosts,
              filteredPosts: state.filteredPosts.map((post) => (post.id === postId ? { ...post, ...updates } : post)),
              selectedPost: state.selectedPost?.id === postId ? { ...state.selectedPost, ...updates } : state.selectedPost,
            }
          }),

        /**
         * Set the currently selected post
         */
        setSelectedPost: (post: Post | null) => set({ selectedPost: post }),

        /**
         * Set loading state
         */
        setLoading: (loading: boolean) => set({ loading }),

        /**
         * Set error message
         */
        setError: (error: string | null) => set({ error }),

        /**
         * Get post by ID
         */
        getPostById: (postId: string) => {
          const { posts } = get()
          return posts.find((post) => post.id === postId)
        },

        /**
         * Get posts by author ID
         */
        getPostsByAuthor: (authorId: string) => {
          const { posts } = get()
          return posts.filter((post) => post.authorId === authorId)
        },

        /**
         * Like a post
         */
        likePost: (postId: string) => {
          const { updatePost: update } = get()
          const post = get().getPostById(postId)
          if (post && !post.isLiked) {
            update(postId, {
              isLiked: true,
              likesCount: post.likesCount + 1,
            })
          }
        },

        /**
         * Unlike a post
         */
        unlikePost: (postId: string) => {
          const { updatePost: update } = get()
          const post = get().getPostById(postId)
          if (post && post.isLiked) {
            update(postId, {
              isLiked: false,
              likesCount: Math.max(0, post.likesCount - 1),
            })
          }
        },

        /**
         * Add a comment to a post
         */
        addComment: (postId: string) => {
          const { updatePost: update } = get()
          const post = get().getPostById(postId)
          if (post) {
            update(postId, {
              commentsCount: post.commentsCount + 1,
            })
          }
        },

        /**
         * Remove a comment from a post
         */
        removeComment: (postId: string) => {
          const { updatePost: update } = get()
          const post = get().getPostById(postId)
          if (post) {
            update(postId, {
              commentsCount: Math.max(0, post.commentsCount - 1),
            })
          }
        },

        /**
         * Filter posts by author
         */
        filterPostsByAuthor: (authorId: string) => {
          const { posts } = get()
          const filtered = posts.filter((post) => post.authorId === authorId)
          set({ filteredPosts: filtered })
        },

        /**
         * Clear all filters
         */
        clearFilters: () => {
          const { posts } = get()
          set({ filteredPosts: posts })
        },
      }),
      {
        name: 'posts-store',
      },
    ),
  ),
)
