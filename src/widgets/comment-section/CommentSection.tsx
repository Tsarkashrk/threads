/**
 * CommentSection Component
 * Display comments section with form for a post
 */

import { useComments } from '../../shared/hooks/useComments'
import { useAuth } from '../../shared/hooks/useAuth'
import { useTheme } from '../../shared/context'
import { CommentForm } from '../../features/comment-form/CommentForm'
import { CommentCard } from '../comment-card/CommentCard'

export interface CommentSectionProps {
  postId: number
}

/**
 * CommentSection Component
 * Renders comments section with form and comment list
 */
export function CommentSection({ postId }: CommentSectionProps) {
  const { theme } = useTheme()
  const { user } = useAuth()
  const { comments, isLoading, addComment } = useComments(postId)

  const handleAddComment = async (body: string) => {
    if (!user) return
    await addComment(body, user.id)
  }

  return (
    <div data-testid="comment-section" className="space-y-4">
      {/* Title */}
      <h3 data-testid="comments-title" className="font-semibold text-lg" style={{ color: theme === 'light' ? '#111827' : '#FFFFFF' }}>
        Comments ({comments.length})
      </h3>

      {/* Add Comment Form */}
      {user && <CommentForm onSubmit={handleAddComment} />}

      {/* Comments List */}
      {isLoading ? (
        <div className="text-center py-6" style={{ color: theme === 'light' ? '#4B5563' : '#9CA3AF' }}>
          Loading comments...
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-6" style={{ color: theme === 'light' ? '#4B5563' : '#9CA3AF' }}>
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <div data-testid="comments-list" className="space-y-2">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  )
}
