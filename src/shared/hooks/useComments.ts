/**
 * useComments Hook
 * Manages comments fetching and creation
 */

import { useState, useEffect } from 'react'

export interface CommentUser {
  id: number
  username: string
  fullName: string
}

export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: CommentUser
}

interface CommentsResponse {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}

export function useComments(postId: number) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!postId) return

    const fetchComments = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`https://dummyjson.com/comments/post/${postId}`)
        const data: CommentsResponse = await response.json()
        setComments(data.comments)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch comments')
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [postId])

  const addComment = async (body: string, userId: number): Promise<Comment | null> => {
    try {
      const response = await fetch('https://dummyjson.com/comments/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          body,
          postId,
          userId,
        }),
      })
      const newComment: Comment = await response.json()
      setComments((prev) => [newComment, ...prev])
      return newComment
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to add comment'
      setError(errorMsg)
      return null
    }
  }

  return {
    comments,
    isLoading,
    error,
    addComment,
  }
}
