/**
 * Home Page
 * Landing page / main entry point
 */

import { useLoadPosts, usePosts } from '../../shared/hooks/usePosts'
import { Feed } from '../../widgets'

export default function HomePage() {
  useLoadPosts({ limit: 20, skip: 0 })
  const { posts, isLoading } = usePosts()

  const handleRefresh = () => {
    // Refresh feed logic here
    window.location.reload()
  }

  return (
    <div className="w-full h-full min-h-screen pt-16 lg:pt-0 overflow-y-auto">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <Feed posts={posts} onRefresh={handleRefresh} isLoading={isLoading} />
      </div>
    </div>
  )
}
