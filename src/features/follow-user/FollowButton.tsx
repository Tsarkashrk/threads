import { useState } from 'react'
import { Button } from '../../shared'
import { useFollowUser } from './hooks'

export interface FollowButtonProps {
  userId: string
  isFollowing: boolean
}

/**
 * FollowButton Component
 * Button for following/unfollowing users
 */
export function FollowButton({ userId, isFollowing: initialIsFollowing }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
  const [isLoading, setIsLoading] = useState(false)
  const { followUser, unfollowUser } = useFollowUser()

  const handleToggleFollow = async () => {
    setIsLoading(true)
    try {
      if (isFollowing) {
        await unfollowUser({
          targetUserId: userId,
          currentUserId: 'current-user',
        })
        setIsFollowing(false)
      } else {
        await followUser({
          targetUserId: userId,
          currentUserId: 'current-user',
        })
        setIsFollowing(true)
      }
    } catch (error) {
      console.error('Failed to toggle follow:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant={isFollowing ? 'secondary' : 'primary'}  onClick={handleToggleFollow} disabled={isLoading}>
      {isLoading ? 'Loading...' : isFollowing ? 'Following' : 'Follow'}
    </Button>
  )
}
