/**
 * API endpoints configuration
 */
export const API_ENDPOINTS = {
  POSTS: '/api/posts',
  USERS: '/api/users',
  COMMENTS: '/api/comments',
  LIKES: '/api/likes',
  FOLLOWS: '/api/follows',
} as const

/**
 * Application constants
 */
export const APP_CONSTANTS = {
  MAX_POST_LENGTH: 500,
  MAX_COMMENT_LENGTH: 280,
  MAX_USERNAME_LENGTH: 20,
  MIN_USERNAME_LENGTH: 3,
} as const
