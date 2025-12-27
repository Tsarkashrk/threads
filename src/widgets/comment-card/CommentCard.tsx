/**
 * CommentCard Component
 * Display a single comment
 */

import type { Comment } from '../../shared/hooks/useComments'
import { useTheme } from '../../shared/context'
import { Button } from '../../shared'

export interface CommentCardProps {
  comment: Comment
}

/**
 * CommentCard Component
 * Renders a single comment with user info and content
 */
export function CommentCard({ comment }: CommentCardProps) {
  const { theme } = useTheme()

  return (
    <div
      className="rounded-lg border p-3 sm:p-4"
      style={{
        backgroundColor: theme === 'light' ? '#F9FAFB' : '#111827',
        borderColor: theme === 'light' ? '#E5E7EB' : '#374151',
      }}>
      {/* Header */}
      <div className="flex items-start gap-2 mb-2">
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">{comment.user.fullName?.[0]?.toUpperCase() || 'U'}</div>
        <div>
          <p className="font-semibold text-sm" style={{ color: theme === 'light' ? '#111827' : '#FFFFFF' }}>
            {comment.user.fullName}
          </p>
          <p className="text-xs" style={{ color: theme === 'light' ? '#6B7280' : '#9CA3AF' }}>
            @{comment.user.username}
          </p>
        </div>
      </div>

      {/* Body */}
      <p className="text-sm leading-relaxed mb-2" style={{ color: theme === 'light' ? '#4B5563' : '#D1D5DB' }}>
        {comment.body}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-3">
        <Button className="flex items-center gap-1 text-xs transition-colors" >
          <span>❤️</span>
          <span>{comment.likes}</span>
        </Button>
      </div>
    </div>
  )
}
