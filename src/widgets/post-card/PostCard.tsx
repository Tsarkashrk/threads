/**
 * PostCard Component
 * Individual post card for displaying in feed
 */

import type { Post } from '../../entities/post'
import { Button } from '../../shared'
import { useTheme } from '../../shared/context'
import { useUser } from '../../shared/hooks'

export interface PostCardProps {
  post: Post
  onClick?: () => void
}

/**
 * PostCard Component
 * Renders a single post with interactions
 */
export function PostCard({ post, onClick }: PostCardProps) {
  const { theme } = useTheme()
  const { user: postAuthor, isLoading: isLoadingAuthor } = useUser(post.userId)

  const formatDate = (dateString?: string) => {
    if (!dateString) {
      return 'Recently'
    }
    try {
      return new Date(dateString).toLocaleDateString()
    } catch {
      return 'Recently'
    }
  }

  return (
    <div
      data-testid="post-card"
      className="rounded-lg border p-4 sm:p-6 transition-colors cursor-pointer hover:opacity-90"
      onClick={onClick}
      style={{
        backgroundColor: theme === 'light' ? '#FFFFFF' : '#000000',
        borderColor: theme === 'light' ? '#E5E7EB' : '#374151',
      }}>
      <div className="flex justify-between items-start mb-3 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs sm:text-sm font-semibold overflow-hidden">{isLoadingAuthor ? 'U' : postAuthor?.image ? <img src={postAuthor.image} alt={postAuthor.firstName} className="w-full h-full object-cover" /> : postAuthor?.firstName?.[0]?.toUpperCase() || 'U'}</div>
          <div data-testid="post-author">
            <span data-testid="author-name" className="font-semibold text-sm" style={{ color: theme === 'light' ? '#111827' : '#FFFFFF' }}>
              {isLoadingAuthor ? 'Loading...' : postAuthor ? `${postAuthor.firstName} ${postAuthor.lastName}` : `User #${post.userId}`}
            </span>
            <p data-testid="author-username" className="text-xs" style={{ color: theme === 'light' ? '#6B7280' : '#9CA3AF' }}>
              {isLoadingAuthor ? '' : postAuthor ? `@${postAuthor.username}` : `@user${post.userId}`}
            </p>
          </div>
        </div>
        <span data-testid="post-date" className="text-xs sm:text-sm whitespace-nowrap" style={{ color: theme === 'light' ? '#6B7280' : '#9CA3AF' }}>
          {formatDate(post.createdAt)}
        </span>
      </div>

      <h3 data-testid="post-title" className="font-semibold text-base sm:text-lg mb-2" style={{ color: theme === 'light' ? '#111827' : '#FFFFFF' }}>
        {post.title}
      </h3>

      <p data-testid="post-body" className="leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base" style={{ color: theme === 'light' ? '#4B5563' : '#D1D5DB' }}>
        {post.body}
      </p>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-2 py-1 text-xs rounded-full"
              style={{
                backgroundColor: theme === 'light' ? '#EFF6FF' : '#1E3A8A',
                color: theme === 'light' ? '#1E40AF' : '#93C5FD',
              }}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div
        data-testid="post-reactions"
        className="flex flex-wrap gap-3 sm:gap-4 mt-4 pt-4 border-t text-sm"
        style={{
          borderColor: theme === 'light' ? '#E5E7EB' : '#374151',
        }}>
        <Button data-testid="like-button" className="flex items-center gap-1 transition-colors">
          <span className="text-base sm:text-lg">❤️</span>
          <span className="text-xs sm:text-sm">{post.reactions.likes}</span>
        </Button>
        {/* <Button className="flex items-center gap-1 transition-colors" >
          <span className="text-base sm:text-lg">👎</span>
          <span className="text-xs sm:text-sm">{post.reactions.dislikes}</span>
        </Button> */}
        <Button data-testid="views-button" className="flex items-center gap-1 transition-colors">
          <span className="text-base sm:text-lg">👁️</span>
          <span className="text-xs sm:text-sm">{post.views}</span>
        </Button>
        <Button data-testid="share-button" className="flex items-center gap-1 transition-colors">
          <span className="text-base sm:text-lg">↗️</span>
          <span className="hidden sm:inline text-xs">Share</span>
        </Button>
      </div>
    </div>
  )
}
