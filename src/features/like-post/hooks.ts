/**
 * Like Post Feature
 * Handles liking/unliking posts
 */

export interface LikePostInput {
  postId: string
  userId: string
}

/**
 * Hook to handle post liking
 */
export function useLikePost() {
  const likePost = async (input: LikePostInput): Promise<void> => {
    // Simulated API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Post ${input.postId} liked by ${input.userId}`)
        resolve()
      }, 300)
    })
  }

  const unlikePost = async (input: LikePostInput): Promise<void> => {
    // Simulated API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Post ${input.postId} unliked by ${input.userId}`)
        resolve()
      }, 300)
    })
  }

  return { likePost, unlikePost }
}
