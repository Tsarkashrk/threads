/**
 * User Entity Model
 * Core user data structure
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

export interface UserProfile extends User {
  email?: string
  website?: string
  location?: string
}
