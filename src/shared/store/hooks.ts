/**
 * Custom Hooks - Convenient selectors for Zustand stores
 * These hooks combine store operations for common use cases
 *
 * Usage:
 * import { useCurrentUser, useUserPosts, usePostComments } from '@/shared/store/hooks';
 */

import { useUsersStore } from './slices/usersSlice'
import { usePostsStore } from './slices/postsSlice'
import { useCommentsStore } from './slices/commentsSlice'

/**
 * Get the current authenticated user
 * @returns Current user or null
 */
export const useCurrentUser = () => {
  return useUsersStore((state) => state.currentUser)
}

/**
 * Get all users in the store
 * @returns Array of all users
 */
export const useAllUsers = () => {
  return useUsersStore((state) => state.users)
}

/**
 * Get a specific user by ID
 * @param userId - The user's ID
 * @returns User object or undefined
 */
export const useUserById = (userId: string) => {
  return useUsersStore((state) => state.getUserById(userId))
}

/**
 * Get all posts by a specific author
 * @param authorId - The author's user ID
 * @returns Array of posts by that author
 */
export const useUserPosts = (authorId: string) => {
  return usePostsStore((state) => state.getPostsByAuthor(authorId))
}

/**
 * Get all posts in the feed
 * @returns Array of all posts
 */
export const useAllPosts = () => {
  return usePostsStore((state) => state.posts)
}

/**
 * Get a specific post by ID
 * @param postId - The post's ID
 * @returns Post object or undefined
 */
export const usePostById = (postId: string) => {
  return usePostsStore((state) => state.getPostById(postId))
}

/**
 * Get filtered posts (currently filtered by author)
 * @returns Array of filtered posts
 */
export const useFilteredPosts = () => {
  return usePostsStore((state) => state.filteredPosts)
}

/**
 * Get all comments on a specific post
 * @param postId - The post's ID
 * @returns Array of comments on that post
 */
export const usePostComments = (postId: string) => {
  return useCommentsStore((state) => state.getCommentsByPost(postId))
}

/**
 * Get all comments by a specific author
 * @param authorId - The author's user ID
 * @returns Array of comments by that author
 */
export const useUserComments = (authorId: string) => {
  return useCommentsStore((state) => state.getCommentsByAuthor(authorId))
}

/**
 * Get all comments in the store
 * @returns Array of all comments
 */
export const useAllComments = () => {
  return useCommentsStore((state) => state.comments)
}

/**
 * Get a specific comment by ID
 * @param commentId - The comment's ID
 * @returns Comment object or undefined
 */
export const useCommentById = (commentId: string) => {
  return useCommentsStore((state) => state.getCommentById(commentId))
}

/**
 * Get currently selected post comments
 * @returns Array of comments for the selected post
 */
export const useSelectedPostComments = () => {
  return useCommentsStore((state) => state.selectedPostComments)
}

/**
 * Get user loading state
 * @returns True if users are being loaded
 */
export const useUsersLoading = () => {
  return useUsersStore((state) => state.loading)
}

/**
 * Get user error state
 * @returns Error message or null
 */
export const useUsersError = () => {
  return useUsersStore((state) => state.error)
}

/**
 * Get posts loading state
 * @returns True if posts are being loaded
 */
export const usePostsLoading = () => {
  return usePostsStore((state) => state.loading)
}

/**
 * Get posts error state
 * @returns Error message or null
 */
export const usePostsError = () => {
  return usePostsStore((state) => state.error)
}

/**
 * Get comments loading state
 * @returns True if comments are being loaded
 */
export const useCommentsLoading = () => {
  return useCommentsStore((state) => state.loading)
}

/**
 * Get comments error state
 * @returns Error message or null
 */
export const useCommentsError = () => {
  return useCommentsStore((state) => state.error)
}
