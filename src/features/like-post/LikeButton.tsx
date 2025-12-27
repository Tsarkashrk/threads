import { Button } from '../../shared'
import { useLikePost } from './hooks'
import { useState } from 'react'

export interface LikeButtonProps {
  postId: string
  isLiked: boolean
  likesCount: number
}

/**
 * LikeButton Component
 * Button for liking/unliking posts
 */
export function LikeButton({ postId, isLiked: initialIsLiked, likesCount: initialLikesCount }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [likesCount, setLikesCount] = useState(initialLikesCount)
  const [isLoading, setIsLoading] = useState(false)
  const { likePost, unlikePost } = useLikePost()

  const handleToggleLike = async () => {
    setIsLoading(true)
    try {
      if (isLiked) {
        await unlikePost({ postId, userId: 'current-user' })
        setIsLiked(false)
        setLikesCount((prev) => prev - 1)
      } else {
        await likePost({ postId, userId: 'current-user' })
        setIsLiked(true)
        setLikesCount((prev) => prev + 1)
      }
    } catch (error) {
      console.error('Failed to toggle like:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleToggleLike} disabled={isLoading} className={isLiked ? 'liked' : ''}>
      {isLiked ? '❤️' : '🤍'} {likesCount}
    </Button>
  )
}
