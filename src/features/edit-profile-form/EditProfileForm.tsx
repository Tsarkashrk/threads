/**
 * EditProfileForm Component
 * Form for editing user profile information
 */

import { useState } from 'react'
import type { AuthUser, UpdateUserRequest } from '../../shared/api/auth'
import { useTheme } from '../../shared/context'

export interface EditProfileFormProps {
  user: AuthUser
  onSubmit: (data: UpdateUserRequest) => Promise<void>
  isLoading?: boolean
}

/**
 * EditProfileForm Component
 * Allows users to edit their profile information
 */
export function EditProfileForm({ user, onSubmit, isLoading = false }: EditProfileFormProps) {
  const { theme } = useTheme()
  const [formData, setFormData] = useState<UpdateUserRequest>({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    gender: user.gender || '',
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [selectedGender, setSelectedGender] = useState(formData.gender || '')

  const handleInputChange = (name: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError(null)
    setSuccess(false)
  }

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedGender(value)
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }))
    setError(null)
    setSuccess(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    try {
      await onSubmit(formData)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div
          className="p-4 border rounded-lg text-sm"
          style={{
            backgroundColor: theme === 'light' ? '#FEE2E2' : '#7F1D1D',
            borderColor: theme === 'light' ? '#FCA5A5' : '#991B1B',
            color: theme === 'light' ? '#991B1B' : '#FCA5A5',
          }}>
          {error}
        </div>
      )}

      {success && (
        <div
          className="p-4 border rounded-lg text-sm"
          style={{
            backgroundColor: theme === 'light' ? '#DCFCE7' : '#14532D',
            borderColor: theme === 'light' ? '#86EFAC' : '#166534',
            color: theme === 'light' ? '#166534' : '#86EFAC',
          }}>
          Profile updated successfully!
        </div>
      )}

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: theme === 'light' ? '#374151' : '#D1D5DB' }}>
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName')(e.target.value)}
            placeholder="Enter first name"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              border: `1px solid ${theme === 'light' ? '#D1D5DB' : '#4B5563'}`,
              borderRadius: '0.5rem',
              backgroundColor: theme === 'light' ? '#FFFFFF' : '#1F2937',
              color: theme === 'light' ? '#111827' : '#FFFFFF',
            }}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: theme === 'light' ? '#374151' : '#D1D5DB' }}>
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName')(e.target.value)}
            placeholder="Enter last name"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              border: `1px solid ${theme === 'light' ? '#D1D5DB' : '#4B5563'}`,
              borderRadius: '0.5rem',
              backgroundColor: theme === 'light' ? '#FFFFFF' : '#1F2937',
              color: theme === 'light' ? '#111827' : '#FFFFFF',
            }}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: theme === 'light' ? '#374151' : '#D1D5DB' }}>
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email')(e.target.value)}
            placeholder="Enter email"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              border: `1px solid ${theme === 'light' ? '#D1D5DB' : '#4B5563'}`,
              borderRadius: '0.5rem',
              backgroundColor: theme === 'light' ? '#FFFFFF' : '#1F2937',
              color: theme === 'light' ? '#111827' : '#FFFFFF',
            }}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: theme === 'light' ? '#374151' : '#D1D5DB' }}>
            Gender
          </label>
          <select
            value={selectedGender}
            onChange={handleGenderChange}
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              border: `1px solid ${theme === 'light' ? '#D1D5DB' : '#4B5563'}`,
              borderRadius: '0.5rem',
              backgroundColor: theme === 'light' ? '#FFFFFF' : '#1F2937',
              color: theme === 'light' ? '#111827' : '#FFFFFF',
            }}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isLoading}
          style={{
            backgroundColor: theme === 'light' ? '#2563EB' : '#3B82F6',
            color: '#FFFFFF',
          }}
          className="w-full px-4 py-2 font-medium rounded-lg transition-colors disabled:cursor-not-allowed hover:opacity-90">
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
