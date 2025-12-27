/**
 * Posts Hooks
 * Custom hooks for accessing posts state
 */

import { useEffect } from 'react'
import { usePostsStore } from '../store/posts'
import type { PostsListParams, PostsSearchParams } from '../../entities/post'

/**
 * Hook to use posts store
 */
export function usePosts() {
  return usePostsStore()
}

/**
 * Hook to fetch all posts on component mount
 */
export function useLoadPosts(params?: PostsListParams) {
  const { fetchPosts, isLoading } = usePostsStore()

  useEffect(() => {
    fetchPosts(params).catch(() => {
      // Error handled in store
    })
  }, [params, fetchPosts])

  return { isLoading }
}

/**
 * Hook to search posts
 */
export function useSearchPosts() {
  const { searchPosts, isLoading, error, posts } = usePostsStore()

  const search = async (params: PostsSearchParams) => {
    await searchPosts(params)
  }

  return { search, isLoading, error, posts }
}

/**
 * Hook to get single post
 */
export function usePost(postId: number) {
  const { currentPost, fetchPostById, isLoading, error } = usePostsStore()

  useEffect(() => {
    if (postId) {
      fetchPostById(postId).catch(() => {
        // Error handled in store
      })
    }
  }, [postId, fetchPostById])

  return { post: currentPost, isLoading, error }
}

/**
 * Hook to get user posts
 */
export function useUserPosts(userId: number, params?: PostsListParams) {
  const { posts, fetchUserPosts, isLoading, error } = usePostsStore()

  useEffect(() => {
    if (userId) {
      fetchUserPosts(userId, params).catch(() => {
        // Error handled in store
      })
    }
  }, [userId, params, fetchUserPosts])

  return { posts, isLoading, error }
}

/**
 * Hook to get posts list info
 */
export function usePostsInfo() {
  const { posts, total, skip, limit, isLoading } = usePostsStore()

  return {
    posts,
    total,
    skip,
    limit,
    isLoading,
    hasMore: skip + limit < total,
    pageCount: Math.ceil(total / limit),
    currentPage: Math.floor(skip / limit) + 1,
  }
}
