/**
 * CommentForm Component
 * Form for adding new comments to a post
 */

import { useState } from 'react'
import { useTheme } from '../../shared/context'
import { useAuth } from '../../shared/hooks/useAuth'
import { Send } from 'lucide-react'

export interface CommentFormProps {
  onSubmit: (body: string) => Promise<void>
}

/**
 * CommentForm Component
 * Allows users to add comments to posts
 */
export function CommentForm({ onSubmit }: CommentFormProps) {
  const { theme } = useTheme()
  const { user } = useAuth()
  const [body, setBody] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!body.trim()) {
      setError('Comment cannot be empty')
      return
    }

    if (!user) {
      setError('You must be logged in to comment')
      return
    }

    try {
      setIsSubmitting(true)
      await onSubmit(body.trim())
      setBody('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add comment')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form data-testid="comment-form" onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <div
          className="p-3 text-sm rounded-lg"
          style={{
            backgroundColor: theme === 'light' ? '#FEE2E2' : '#7F1D1D',
            borderColor: theme === 'light' ? '#FCA5A5' : '#991B1B',
            color: theme === 'light' ? '#991B1B' : '#FCA5A5',
          }}>
          {error}
        </div>
      )}

      <div className="flex gap-2">
        <input
          data-testid="comment-input"
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Add a comment..."
          disabled={isSubmitting || !user}
          style={{
            flex: 1,
            padding: '0.5rem 0.75rem',
            border: `1px solid ${theme === 'light' ? '#D1D5DB' : '#4B5563'}`,
            borderRadius: '0.5rem',
            backgroundColor: theme === 'light' ? '#FFFFFF' : '#1F2937',
            color: theme === 'light' ? '#111827' : '#FFFFFF',
            fontSize: '0.875rem',
          }}
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <button
          data-testid="comment-submit"
          type="submit"
          disabled={isSubmitting || !user || !body.trim()}
          style={{
            padding: '0.5rem 0.75rem',
            backgroundColor: body.trim() && user ? '#3B82F6' : '#9CA3AF',
            color: '#FFFFFF',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: body.trim() && user ? 'pointer' : 'not-allowed',
          }}
          className="flex items-center gap-1 font-medium transition-opacity hover:opacity-90 disabled:opacity-50">
          <Send size={16} />
        </button>
      </div>
    </form>
  )
}
