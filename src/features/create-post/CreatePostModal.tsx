import { useState } from 'react'
import { Button, Modal } from '../../shared'

export interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  onPostCreated?: () => void
}

/**
 * CreatePostModal Component
 * Modal for creating a new post
 */
export function CreatePostModal({ isOpen, onClose, onPostCreated }: CreatePostModalProps) {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!content.trim()) return

    setIsLoading(true)
    try {
      setContent('')
      onPostCreated?.()
      onClose()
    } catch (error) {
      console.error('Failed to create post:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create a new post">
      <div className="flex flex-col gap-4">
        <textarea
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:border-gray-900 dark:focus:border-white focus:ring-2 focus:ring-offset-0 focus:ring-gray-900 dark:focus:ring-white resize-none font-inherit"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
        />
        <div className="flex justify-end gap-2 sm:gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={isLoading || !content.trim()}>
            {isLoading ? 'Posting...' : 'Post'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
