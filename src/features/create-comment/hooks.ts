/**
 * Create Comment Feature
 * Handles comment creation logic
 */

import type { Comment } from '../../entities/comment'

export interface CreateCommentInput {
  postId: string
  content: string
}

/**
 * Hook to handle comment creation
 */
export function useCreateComment() {
  const createComment = async (input: CreateCommentInput): Promise<Comment> => {
    // Simulated API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substring(7),
          postId: input.postId,
          authorId: 'current-user',
          content: input.content,
          likesCount: 0,
          isLiked: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      }, 300)
    })
  }

  return { createComment }
}
