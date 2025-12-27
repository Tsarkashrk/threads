/**
 * Profile Page
 * User profile page with user info and posts
 */

import { useEffect } from 'react'
import { useAuthStore } from '../../shared/store/auth'
import { useTheme } from '../../shared/context'
import { useUserPosts } from '../../shared/hooks/usePosts'
import { UserProfile, PostList } from '../../widgets'

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user)
  const { theme } = useTheme()
  const { posts, isLoading } = useUserPosts(user?.id ?? 0)

  useEffect(() => {
    // Posts are automatically fetched by useUserPosts hook
  }, [user?.id])

  if (!user) {
    return (
      <div
        className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex items-center justify-center"
        style={{
          backgroundColor: theme === 'light' ? '#F9FAFB' : '#111827',
        }}>
        <p style={{ color: theme === 'light' ? '#4B5563' : '#9CA3AF' }}>Please log in to view your profile</p>
      </div>
    )
  }

  const profileUser = {
    id: user.id.toString(),
    username: user.username,
    displayName: `${user.firstName} ${user.lastName}`,
    avatar: user.image,
    bio: `${user.gender} • Member since 2024`,
    followersCount: 0,
    followingCount: 0,
    postsCount: posts.length,
    isFollowing: false,
    createdAt: new Date().toISOString(),
  }

  return (
    <div
      className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      style={{
        backgroundColor: theme === 'light' ? '#FFFFFF' : '#000000',
      }}>
      <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
        <div>
          <UserProfile user={profileUser} />
        </div>
        <div className="space-y-4">
          <h2
            className="text-2xl sm:text-3xl font-bold py-2 rounded-lg"
            style={{
              color: theme === 'light' ? '#000000' : '#FFFFFF',
              backgroundColor: theme === 'light' ? '#FFFFFF' : '#000000',
            }}>
            Posts
          </h2>
          <PostList posts={posts} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
