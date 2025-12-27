/**
 * PostList Widget
 * Displays a list of posts with interactions
 */

import { useState } from 'react'
import type { Post } from '../../entities/post'
import { useTheme } from '../../shared/context'
import { PostModal } from '../../features'
import { PostCard } from '../post-card/PostCard'

export interface PostListProps {
  posts: Post[]
  isLoading?: boolean
}

/**
 * PostList Component
 * Widget that renders a list of posts
 */
export function PostList({ posts, isLoading = false }: PostListProps) {
  const { theme } = useTheme()
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPost(null)
  }

  if (isLoading) {
    return (
      <div className="text-center py-8" style={{ color: theme === 'light' ? '#4B5563' : '#9CA3AF' }}>
        Loading posts...
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <p style={{ color: theme === 'light' ? '#4B5563' : '#9CA3AF' }} className="text-lg">
          No posts yet. Be the first to post!
        </p>
      </div>
    )
  }

  return (
    <>
      <div
        className="space-y-4 divide-y"
        style={{
          borderColor: theme === 'light' ? '#E5E7EB' : '#374151',
        }}>
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} onClick={() => handlePostClick(post)} />
        ))}
      </div>
      <PostModal post={selectedPost} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}
