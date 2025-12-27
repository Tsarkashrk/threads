/**
 * Follow User Feature
 * Handles user following/unfollowing logic
 */

export interface FollowUserInput {
  targetUserId: string
  currentUserId: string
}

/**
 * Hook to handle user following
 */
export function useFollowUser() {
  const followUser = async (input: FollowUserInput): Promise<void> => {
    // Simulated API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`${input.currentUserId} is now following ${input.targetUserId}`)
        resolve()
      }, 300)
    })
  }

  const unfollowUser = async (input: FollowUserInput): Promise<void> => {
    // Simulated API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`${input.currentUserId} is no longer following ${input.targetUserId}`)
        resolve()
      }, 300)
    })
  }

  return { followUser, unfollowUser }
}
