/**
 * Feed Page
 * Dedicated feed/timeline page
 */

import { Feed } from '../../widgets'

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">Feed</h1>
        <Feed />
      </div>
    </div>
  )
}
