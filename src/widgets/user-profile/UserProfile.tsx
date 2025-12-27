/**
 * UserProfile Widget
 * Displays user profile information
 */

import type { User } from '../../entities/user'
import { useTheme } from '../../shared/context'
import { Avatar } from '../../shared'
import './UserProfile.css'

export interface UserProfileProps {
  user: User
}

/**
 * UserProfile Component
 * Widget that displays user profile information
 */
export function UserProfile({ user }: UserProfileProps) {
  const { theme } = useTheme()

  return (
    <div
      className="user-profile"
      style={{
        backgroundColor: theme === 'light' ? '#FFFFFF' : '#000000',
        borderColor: theme === 'light' ? '#EEEEEE' : '#374151',
      }}>
      <div className="profile-header">
        <Avatar src={user.avatar} alt={user.displayName} size="lg" />
        <div className="profile-info">
          <h2 style={{ color: theme === 'light' ? '#111827' : '#F3F4F6' }}>{user.displayName}</h2>
          <p className="username" style={{ color: theme === 'light' ? '#666666' : '#9CA3AF' }}>
            @{user.username}
          </p>
          {user.bio && (
            <p className="bio" style={{ color: theme === 'light' ? '#666666' : '#9CA3AF' }}>
              {user.bio}
            </p>
          )}
        </div>
      </div>

      <div
        className="profile-stats"
        style={{
          borderTopColor: theme === 'light' ? '#EEEEEE' : '#374151',
        }}>
        <div className="stat">
          <span className="stat-value" style={{ color: theme === 'light' ? '#111827' : '#FFFFFF' }}>
            {user.postsCount}
          </span>
          <span className="stat-label" style={{ color: theme === 'light' ? '#666666' : '#9CA3AF' }}>
            Posts
          </span>
        </div>
        <div className="stat">
          <span className="stat-value" style={{ color: theme === 'light' ? '#111827' : '#FFFFFF' }}>
            {user.followersCount}
          </span>
          <span className="stat-label" style={{ color: theme === 'light' ? '#666666' : '#9CA3AF' }}>
            Followers
          </span>
        </div>
        <div className="stat">
          <span className="stat-value" style={{ color: theme === 'light' ? '#111827' : '#FFFFFF' }}>
            {user.followingCount}
          </span>
          <span className="stat-label" style={{ color: theme === 'light' ? '#666666' : '#9CA3AF' }}>
            Following
          </span>
        </div>
      </div>
    </div>
  )
}
