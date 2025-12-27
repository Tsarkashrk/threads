/**
 * Feed Widget
 * Main feed component combining multiple widgets
 */

import { useState } from 'react'
import type { Post } from '../../entities/post'
import { useTheme } from '../../shared/context'
import { PostList } from '../post-list/PostList'
import { CreatePostModal } from '../../features'

export interface FeedProps {
  posts?: Post[]
  onRefresh?: () => void
  isLoading?: boolean
}

/**
 * Feed Component
 * Main feed widget for displaying posts
 */
export function Feed({ posts = [], onRefresh, isLoading = false }: FeedProps) {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const { theme } = useTheme()

  const handlePostCreated = () => {
    onRefresh?.()
  }

  return (
    <div className="w-full h-full">
      <div
        className="sticky top-0 z-10 border-b px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4"
        style={{
          backgroundColor: theme === 'light' ? '#FFFFFF' : '#000000',
          borderColor: theme === 'light' ? '#E4E4E7' : '#3F3F46',
        }}>
        <h2 className="text-xl sm:text-2xl font-bold" style={{ color: theme === 'light' ? '#000000' : '#FFFFFF' }}>
          Home Feed
        </h2>
        {/* <Button variant="primary" onClick={() => setIsCreatePostOpen(true)}>
          Create Post
        </Button> */}
      </div>

      <CreatePostModal isOpen={isCreatePostOpen} onClose={() => setIsCreatePostOpen(false)} onPostCreated={handlePostCreated} />

      <PostList posts={posts} isLoading={isLoading} />
    </div>
  )
}
