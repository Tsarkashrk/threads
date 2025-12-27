import { useState } from 'react'
import { Input, Button } from '../../shared'
import { useCreateComment } from './hooks'

export interface CommentFormProps {
  postId: string
  onCommentCreated?: () => void
}

/**
 * CommentForm Component
 * Form for creating a comment on a post
 */
export function CommentForm({ postId, onCommentCreated }: CommentFormProps) {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { createComment } = useCreateComment()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsLoading(true)
    try {
      await createComment({ postId, content })
      setContent('')
      onCommentCreated?.()
    } catch (error) {
      console.error('Failed to create comment:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="flex gap-2 mt-3" onSubmit={handleSubmit}>
      <div className="flex-1">
        <Input placeholder="Write a comment..." value={content} onChange={setContent} disabled={isLoading} />
      </div>
      <Button variant="primary" disabled={isLoading || !content.trim()}>
        {isLoading ? 'Posting...' : 'Comment'}
      </Button>
    </form>
  )
}
