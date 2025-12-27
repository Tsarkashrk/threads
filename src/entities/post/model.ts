/**
 * Post Entity Model
 * Core post data structure
 */

export interface PostReactions {
  likes: number
  dislikes: number
}

export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: PostReactions
  views: number
  userId: number
  createdAt?: string
  updatedAt?: string
}

export interface PostWithAuthor extends Post {
  author?: {
    id: string
    username: string
    displayName: string
    avatar: string
  }
}

export interface PostsResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export interface PostsListParams {
  limit?: number
  skip?: number
  select?: string
}

export interface PostsSearchParams extends PostsListParams {
  q: string
}
