/**
 * Posts API Service
 * DummyJSON posts endpoints
 */

import type { Post, PostsResponse, PostsListParams, PostsSearchParams } from '../../entities/post'

const API_URL = 'https://dummyjson.com/posts'

export class PostsAPI {
  /**
   * Get all posts with pagination
   */
  static async getAllPosts(params?: PostsListParams): Promise<PostsResponse> {
    try {
      const queryParams = new URLSearchParams()
      if (params?.limit) queryParams.append('limit', params.limit.toString())
      if (params?.skip) queryParams.append('skip', params.skip.toString())
      if (params?.select) queryParams.append('select', params.select)

      const query = queryParams.toString()
      const url = query ? `${API_URL}?${query}` : API_URL

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }

      return await response.json()
    } catch (error) {
      throw new Error(`Posts API error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Get single post by ID
   */
  static async getPostById(id: number): Promise<Post> {
    try {
      const response = await fetch(`${API_URL}/${id}`)
      if (!response.ok) {
        throw new Error('Post not found')
      }

      return await response.json()
    } catch (error) {
      throw new Error(`Failed to fetch post: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Search posts by query
   */
  static async searchPosts(params: PostsSearchParams): Promise<PostsResponse> {
    try {
      const queryParams = new URLSearchParams()
      queryParams.append('q', params.q)
      if (params.limit) queryParams.append('limit', params.limit.toString())
      if (params.skip) queryParams.append('skip', params.skip.toString())
      if (params.select) queryParams.append('select', params.select)

      const response = await fetch(`${API_URL}/search?${queryParams.toString()}`)
      if (!response.ok) {
        throw new Error('Search failed')
      }

      return await response.json()
    } catch (error) {
      throw new Error(`Search error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Get posts by user ID
   */
  static async getPostsByUserId(userId: number, params?: PostsListParams): Promise<PostsResponse> {
    try {
      const queryParams = new URLSearchParams()
      if (params?.limit) queryParams.append('limit', params.limit.toString())
      if (params?.skip) queryParams.append('skip', params.skip.toString())
      if (params?.select) queryParams.append('select', params.select)

      const query = queryParams.toString()
      const url = query ? `${API_URL}/user/${userId}?${query}` : `${API_URL}/user/${userId}`

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch user posts')
      }

      return await response.json()
    } catch (error) {
      throw new Error(`User posts error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}
