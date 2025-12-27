/**
 * Comment Entity Model
 * Core comment data structure
 */

export interface Comment {
  id: string
  postId: string
  authorId: string
  content: string
  likesCount: number
  isLiked: boolean
  createdAt: string
  updatedAt: string
}

export interface CommentWithAuthor extends Comment {
  author: {
    id: string
    username: string
    displayName: string
    avatar: string
  }
}
