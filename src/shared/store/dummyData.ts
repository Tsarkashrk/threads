/**
 * Dummy Data Generation
 * Uses realistic data structure similar to DummyJSON
 */

import type { User, Comment, Post } from '../../entities'

/**
 * Generate dummy users
 * Based on DummyJSON user structure
 */
export function generateDummyUsers(count: number = 10): User[] {
  const firstNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Emma', 'Frank', 'Grace', 'Henry', 'Iris', 'Jack']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']
  const bios = [
    'Tech enthusiast and coffee lover ☕',
    'Digital creator & content curator 📸',
    'Software engineer by day, gamer by night 🎮',
    'Designer, traveler, and dog lover 🐕',
    'Startup founder working on cool things 🚀',
    'Writer and philosopher 📚',
    'Fitness coach and wellness advocate 💪',
    'Artist and creative thinker 🎨',
    'Data scientist exploring AI 🤖',
    'Entrepreneur building the future 💡',
  ]

  const users: User[] = []

  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[i % firstNames.length]
    const lastName = lastNames[i % lastNames.length]
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${i}`

    users.push({
      id: `user-${i}`,
      username,
      displayName: `${firstName} ${lastName}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      bio: bios[i % bios.length],
      followersCount: Math.floor(Math.random() * 5000),
      followingCount: Math.floor(Math.random() * 1000),
      postsCount: Math.floor(Math.random() * 200),
      isFollowing: false,
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    })
  }

  return users
}

/**
 * Generate dummy posts
 * Based on DummyJSON posts structure
 */
export function generateDummyPosts(): Post[] {
  const posts: Post[] = []

  // for (let i = 1; i <= count; i++) {
  //   const randomUser = users[Math.floor(Math.random() * users.length)]
  //   const randomDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)

  //   posts.push({
  //     id: `post-${i}`,
  //     authorId: randomUser.id,
  //     content: postContents[i % postContents.length],
  //     images: Math.random() > 0.7 ? [`https://picsum.photos/400/300?random=${i}`] : undefined,
  //     likesCount: Math.floor(Math.random() * 1000),
  //     commentsCount: Math.floor(Math.random() * 100),
  //     isLiked: false,
  //     createdAt: randomDate.toISOString(),
  //     updatedAt: randomDate.toISOString(),
  //   })
  // }

  return posts
}

/**
 * Generate dummy comments
 * Based on DummyJSON comments structure
 */
export function generateDummyComments(): Comment[] {
  const comments: Comment[] = []

  // for (let i = 1; i <= count; i++) {
  //   const randomUser = users[Math.floor(Math.random() * users.length)]
  //   const randomPost = posts[Math.floor(Math.random() * posts.length)]
  //   const randomDate = new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000)

  //   comments.push({
  //     id: `comment-${i}`,
  //     postId: randomPost.id,
  //     authorId: randomUser.id,
  //     content: commentTexts[i % commentTexts.length],
  //     likesCount: Math.floor(Math.random() * 500),
  //     isLiked: false,
  //     createdAt: randomDate.toISOString(),
  //     updatedAt: randomDate.toISOString(),
  //   })
  // }

  return comments
}

/**
 * Initialize all dummy data
 */
export function initializeDummyData() {
  const users = generateDummyUsers(15)
  const posts = generateDummyPosts()
  const comments = generateDummyComments()

  return {
    users,
    posts,
    comments,
  }
}
