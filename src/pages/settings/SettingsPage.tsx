/**
 * Settings Page
 * User settings and preferences
 */

import { useState } from 'react'
import { Button } from '../../shared'
import { useTheme } from '../../shared/context'
import { EditProfileForm } from '../../features'
import { useAuthStore } from '../../shared/store/auth'
import type { UpdateUserRequest } from '../../shared/api/auth'

interface Settings {
  emailNotifications: boolean
  pushNotifications: boolean
  privateAccount: boolean
}

export default function SettingsPage() {
  const user = useAuthStore((state) => state.user)
  const updateUser = useAuthStore((state) => state.updateUser)
  const isLoading = useAuthStore((state) => state.isLoading)
  const { theme } = useTheme()

  const [settings, setSettings] = useState<Settings>({
    emailNotifications: true,
    pushNotifications: true,
    privateAccount: false,
  })

  const handleToggleSetting = (key: keyof Settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSaveSettings = () => {
    console.log('Settings saved:', settings)
  }

  const handleProfileUpdate = async (data: UpdateUserRequest) => {
    await updateUser(data)
  }

  if (!user) {
    return (
      <div
        className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex items-center justify-center"
        style={{
          backgroundColor: theme === 'light' ? '#F9FAFB' : '#111827',
        }}>
        <p style={{ color: theme === 'light' ? '#4B5563' : '#9CA3AF' }}>Please log in to view settings</p>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      style={{
        backgroundColor: theme === 'light' ? '#FFFFFF' : '#000000',
      }}>
      <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
        {/* Edit profile */}
        <div
          className="rounded-lg shadow-sm p-6 sm:p-8"
          style={{
            backgroundColor: theme === 'light' ? '#FFFFFF' : '#000000',
            border: `1px solid ${theme === 'light' ? '#EEEEEE' : '#374151'}`,
          }}>
          <h1 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: theme === 'light' ? '#111827' : '#FFFFFF' }}>
            Edit Profile
          </h1>

          <EditProfileForm user={user} onSubmit={handleProfileUpdate} isLoading={isLoading} />
        </div>

        {/* Preferences */}
        <div
          className="rounded-lg shadow-sm p-6 sm:p-8 space-y-8"
          style={{
            backgroundColor: theme === 'light' ? '#FFFFFF' : '#000000',
            border: `1px solid ${theme === 'light' ? '#EEEEEE' : '#374151'}`,
          }}>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: theme === 'light' ? '#111827' : '#FFFFFF' }}>
            Preferences
          </h2>

          {/* Notifications */}
          <section
            className="space-y-4 pb-8"
            style={{
              borderBottom: `1px solid ${theme === 'light' ? '#EEEEEE' : '#374151'}`,
            }}>
            <h3 className="text-xl sm:text-2xl font-bold" style={{ color: theme === 'light' ? '#111827' : '#FFFFFF' }}>
              Notifications
            </h3>

            {/* Email */}
            <div className="flex justify-between items-start py-4">
              <div>
                <h4 className="font-semibold" style={{ color: theme === 'light' ? '#111827' : '#FFFFFF' }}>
                  Email Notifications
                </h4>
                <p className="text-sm mt-1" style={{ color: theme === 'light' ? '#666666' : '#9CA3AF' }}>
                  Receive email notifications for new likes and comments
                </p>
              </div>
              <input type="checkbox" checked={settings.emailNotifications} onChange={() => handleToggleSetting('emailNotifications')} />
            </div>

            {/* Push */}
            <div className="flex justify-between items-start py-4">
              <div>
                <h4 className="font-semibold" style={{ color: theme === 'light' ? '#111827' : '#FFFFFF' }}>
                  Push Notifications
                </h4>
                <p className="text-sm mt-1" style={{ color: theme === 'light' ? '#666666' : '#9CA3AF' }}>
                  Receive push notifications on your device
                </p>
              </div>
              <input type="checkbox" checked={settings.pushNotifications} onChange={() => handleToggleSetting('pushNotifications')} />
            </div>
          </section>

          {/* Privacy */}
          <section className="space-y-4 pb-8">
            <h3 className="text-xl sm:text-2xl font-bold" style={{ color: theme === 'light' ? '#111827' : '#FFFFFF' }}>
              Privacy
            </h3>

            <div className="flex justify-between items-start py-4">
              <div>
                <h4 className="font-semibold" style={{ color: theme === 'light' ? '#111827' : '#FFFFFF' }}>
                  Private Account
                </h4>
                <p className="text-sm mt-1" style={{ color: theme === 'light' ? '#666666' : '#9CA3AF' }}>
                  Only approved followers can see your posts
                </p>
              </div>
              <input type="checkbox" checked={settings.privateAccount} onChange={() => handleToggleSetting('privateAccount')} />
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <Button className="sm:flex-1" onClick={handleSaveSettings}>
              Save Preferences
            </Button>
            <Button  className="sm:flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
