/**
 * Root Store - Combines all Zustand store slices
 * Provides a single entry point for accessing all application state
 *
 * Usage:
 * import { useUsersStore, usePostsStore, useCommentsStore, initializeStores } from '@/shared/store';
 *
 * // On app initialization:
 * useEffect(() => {
 *   initializeStores();
 * }, []);
 */

import { useUsersStore } from './slices/usersSlice'
import { usePostsStore } from './slices/postsSlice'
import { useCommentsStore } from './slices/commentsSlice'
import { initializeDummyData } from './dummyData'

/**
 * Initialize all stores with dummy data on first app load
 * This function populates the stores with realistic test data
 */
export const initializeStores = () => {
  const { setUsers } = useUsersStore.getState()
  // const { setPosts } = usePostsStore.getState()
  const { setComments } = useCommentsStore.getState()

  const { users, posts, comments } = initializeDummyData()

  setUsers(users)
  // setPosts(posts)
  setComments(comments)

  // Set initial current user to the first user
  if (users.length > 0) {
    useUsersStore.getState().setCurrentUser(users[0])
  }

  console.log('Stores initialized with dummy data:', { users, posts, comments })
}

// Export all store hooks for convenient access throughout the app
export { useUsersStore, usePostsStore, useCommentsStore }

// Export store type utilities for TypeScript usage
export type { UsersState, User } from './slices/usersSlice'
export type { PostsState, Post, PostWithAuthor } from './slices/postsSlice'
export type { CommentsState, Comment, CommentWithAuthor } from './slices/commentsSlice'
