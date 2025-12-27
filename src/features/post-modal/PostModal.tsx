/**
 * PostModal Component
 * Modal for displaying full post details
 */

import type { Post } from '../../entities/post'
import { useTheme } from '../../shared/context'
import { useUser } from '../../shared/hooks'
import { CommentSection } from '../../widgets/comment-section/CommentSection'
import { X } from 'lucide-react'
import { Button } from '../../shared'

export interface PostModalProps {
  post: Post | null
  isOpen: boolean
  onClose: () => void
}

/**
 * PostModal Component
 * Displays full post details in a modal
 */
export function PostModal({ post, isOpen, onClose }: PostModalProps) {
  const { theme } = useTheme()
  const { user: postAuthor, isLoading: isLoadingAuthor } = useUser(post?.userId ?? null)

  if (!isOpen || !post) return null

  const formatDate = (dateString?: string) => {
    if (!dateString) {
      return 'Recently'
    }
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return 'Recently'
    }
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        data-testid="post-modal"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4 rounded-lg shadow-2xl overflow-y-auto max-h-[90vh]"
        style={{
          backgroundColor: theme === 'light' ? '#FFFFFF' : '#1F2937',
        }}
        onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <div
          className="sticky top-0 flex justify-between items-center p-4 sm:p-6 border-b"
          style={{
            borderColor: theme === 'light' ? '#E5E7EB' : '#374151',
          }}>
          <h2 className="text-xl sm:text-2xl font-bold" style={{ color: theme === 'light' ? '#111827' : '#FFFFFF' }}>
            Post
          </h2>
          <button
            data-testid="modal-close-button"
            onClick={onClose}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            style={{
              backgroundColor: theme === 'light' ? 'transparent' : 'transparent',
            }}>
            <X size={24} style={{ color: theme === 'light' ? '#111827' : '#FFFFFF' }} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Author Info */}
          <div data-testid="modal-author-info" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg overflow-hidden">{isLoadingAuthor ? 'U' : postAuthor?.image ? <img src={postAuthor.image} alt={postAuthor.firstName} className="w-full h-full object-cover" /> : postAuthor?.firstName?.[0]?.toUpperCase() || 'U'}</div>
            <div className="flex-1">
              <p data-testid="modal-author-name" className="font-semibold" style={{ color: theme === 'light' ? '#111827' : '#FFFFFF' }}>
                {isLoadingAuthor ? 'Loading...' : postAuthor ? `${postAuthor.firstName} ${postAuthor.lastName}` : `User #${post.userId}`}
              </p>
              <p data-testid="modal-author-username" className="text-sm" style={{ color: theme === 'light' ? '#6B7280' : '#9CA3AF' }}>
                {isLoadingAuthor ? '' : postAuthor ? `@${postAuthor.username}` : `@user${post.userId}`}
              </p>
            </div>
            <div className="text-sm" style={{ color: theme === 'light' ? '#6B7280' : '#9CA3AF' }}>
              {formatDate(post.createdAt)}
            </div>
          </div>

          {/* Title */}
          <div>
            <h3 data-testid="modal-post-title" className="text-2xl font-bold mb-3" style={{ color: theme === 'light' ? '#111827' : '#FFFFFF' }}>
              {post.title}
            </h3>
          </div>

          {/* Body */}
          <p data-testid="modal-post-body" className="text-base leading-relaxed whitespace-pre-wrap" style={{ color: theme === 'light' ? '#4B5563' : '#D1D5DB' }}>
            {post.body}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div data-testid="modal-tags" className="flex flex-wrap gap-2 pt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full"
                  style={{
                    backgroundColor: theme === 'light' ? '#EFF6FF' : '#1E3A8A',
                    color: theme === 'light' ? '#1E40AF' : '#93C5FD',
                  }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Stats */}
          <div
            data-testid="modal-stats"
            className="grid grid-cols-2 gap-4 pt-6 border-t"
            style={{
              borderColor: theme === 'light' ? '#E5E7EB' : '#374151',
            }}>
            <div className="text-center">
              <p className="text-2xl font-bold" style={{ color: theme === 'light' ? '#111827' : '#FFFFFF' }}>
                {post.reactions.likes}
              </p>
              <p className="text-sm" style={{ color: theme === 'light' ? '#6B7280' : '#9CA3AF' }}>
                Likes
              </p>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold" style={{ color: theme === 'light' ? '#111827' : '#FFFFFF' }}>
                {post.views}
              </p>
              <p className="text-sm" style={{ color: theme === 'light' ? '#6B7280' : '#9CA3AF' }}>
                Views
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 pb-6 border-t" style={{ borderColor: theme === 'light' ? '#E5E7EB' : '#374151' }}>
            <Button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors">
              <span>❤️</span>
              <span>Like</span>
            </Button>
            {/* <Button
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors"
              style={{
                color: theme === 'light' ? '#4B5563' : '#9CA3AF',
                backgroundColor: theme === 'light' ? '#F3F4F6' : '#374151',
              }}>
              <span>👎</span>
              <span>Dislike</span>
            </Button> */}
            <Button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors">
              <span>↗️</span>
              <span>Share</span>
            </Button>
          </div>

          {/* Comments Section */}
          <div
            data-testid="modal-comments-section"
            className="pt-6 border-t"
            style={{
              borderColor: theme === 'light' ? '#E5E7EB' : '#374151',
            }}>
            <CommentSection postId={post.id} />
          </div>
        </div>
      </div>
    </>
  )
}
