/**
 * Comments Store Slice
 * Manages comments data and comment-related operations
 */

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

/**
 * Comment type definition
 */
export interface Comment {
  id: string
  postId: string
  authorId: string
  content: string
  likesCount: number
  isLiked: boolean
  createdAt: string
  updatedAt: string
}

/**
 * Comment with author info
 */
export interface CommentWithAuthor extends Comment {
  author: {
    id: string
    username: string
    displayName: string
    avatar: string
  }
}

/**
 * Comments state interface
 */
export interface CommentsState {
  comments: Comment[]
  selectedPostComments: Comment[]
  loading: boolean
  error: string | null

  // Actions
  setComments: (comments: Comment[]) => void
  addComment: (comment: Comment) => void
  removeComment: (commentId: string) => void
  updateComment: (commentId: string, updates: Partial<Comment>) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  getCommentById: (commentId: string) => Comment | undefined
  getCommentsByPost: (postId: string) => Comment[]
  getCommentsByAuthor: (authorId: string) => Comment[]
  setPostComments: (postId: string) => void
  likeComment: (commentId: string) => void
  unlikeComment: (commentId: string) => void
  clearPostComments: () => void
}

/**
 * Zustand store for comments management
 */
export const useCommentsStore = create<CommentsState>()(
  devtools(
    persist(
      (set, get) => ({
        comments: [],
        selectedPostComments: [],
        loading: false,
        error: null,

        /**
         * Set all comments
         */
        setComments: (comments: Comment[]) => set({ comments }),

        /**
         * Add a new comment
         */
        addComment: (comment: Comment) =>
          set((state) => {
            const newComments = [comment, ...state.comments]
            const updatedSelectedPostComments = comment.postId === state.selectedPostComments[0]?.postId ? [comment, ...state.selectedPostComments] : state.selectedPostComments
            return {
              comments: newComments,
              selectedPostComments: updatedSelectedPostComments,
            }
          }),

        /**
         * Remove a comment by ID
         */
        removeComment: (commentId: string) =>
          set((state) => {
            const newComments = state.comments.filter((comment) => comment.id !== commentId)
            return {
              comments: newComments,
              selectedPostComments: state.selectedPostComments.filter((comment) => comment.id !== commentId),
            }
          }),

        /**
         * Update a comment's data
         */
        updateComment: (commentId: string, updates: Partial<Comment>) =>
          set((state) => ({
            comments: state.comments.map((comment) => (comment.id === commentId ? { ...comment, ...updates } : comment)),
            selectedPostComments: state.selectedPostComments.map((comment) => (comment.id === commentId ? { ...comment, ...updates } : comment)),
          })),

        /**
         * Set loading state
         */
        setLoading: (loading: boolean) => set({ loading }),

        /**
         * Set error message
         */
        setError: (error: string | null) => set({ error }),

        /**
         * Get comment by ID
         */
        getCommentById: (commentId: string) => {
          const { comments } = get()
          return comments.find((comment) => comment.id === commentId)
        },

        /**
         * Get comments by post ID
         */
        getCommentsByPost: (postId: string) => {
          const { comments } = get()
          return comments.filter((comment) => comment.postId === postId)
        },

        /**
         * Get comments by author ID
         */
        getCommentsByAuthor: (authorId: string) => {
          const { comments } = get()
          return comments.filter((comment) => comment.authorId === authorId)
        },

        /**
         * Set comments for a specific post
         */
        setPostComments: (postId: string) => {
          const { getCommentsByPost } = get()
          const postComments = getCommentsByPost(postId)
          set({ selectedPostComments: postComments })
        },

        /**
         * Like a comment
         */
        likeComment: (commentId: string) => {
          const { updateComment: update } = get()
          const comment = get().getCommentById(commentId)
          if (comment && !comment.isLiked) {
            update(commentId, {
              isLiked: true,
              likesCount: comment.likesCount + 1,
            })
          }
        },

        /**
         * Unlike a comment
         */
        unlikeComment: (commentId: string) => {
          const { updateComment: update } = get()
          const comment = get().getCommentById(commentId)
          if (comment && comment.isLiked) {
            update(commentId, {
              isLiked: false,
              likesCount: Math.max(0, comment.likesCount - 1),
            })
          }
        },

        /**
         * Clear post comments
         */
        clearPostComments: () => set({ selectedPostComments: [] }),
      }),
      {
        name: 'comments-store',
      },
    ),
  ),
)
