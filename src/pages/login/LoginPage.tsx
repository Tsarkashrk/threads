/**
 * Login Page
 * User authentication page
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../shared/hooks/useAuth'
import { useTheme } from '../../shared/context'
import { Mail, Lock, Loader } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading, error } = useAuth()
  const { theme } = useTheme()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!username.trim() || !password.trim()) {
      setFormError('Please fill in all fields')
      return
    }

    try {
      await login({
        username: username.trim(),
        password: password.trim(),
        expiresInMins: 60,
      })
      navigate('/')
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Login failed')
    }
  }

  // Demo credentials hint
  const demoCredentials = [
    { username: 'emilys', password: 'emilyspass' },
    { username: 'michaelw', password: 'michaelwpass' },
    { username: 'sarahandersson', password: 'sarahpass' },
  ]

  return (
    <div
      style={{
        backgroundColor: theme === 'light' ? '#FAFAF9' : '#111827',
      }}
      className="w-full h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: theme === 'light' ? '#111827' : '#FFFFFF' }}>
            Threads
          </h1>
          <p style={{ color: theme === 'light' ? '#4B5563' : '#9CA3AF' }}>Sign in to your account</p>
        </div>

        {/* Error Message */}
        {(formError || error) && (
          <div
            className="mb-4 p-3 border rounded-lg"
            style={{
              backgroundColor: theme === 'light' ? '#FEE2E2' : '#7F1D1D',
              borderColor: theme === 'light' ? '#FCA5A5' : '#991B1B',
            }}>
            <p style={{ color: theme === 'light' ? '#991B1B' : '#FCA5A5' }} className="text-sm">
              {formError || error}
            </p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2" style={{ color: theme === 'light' ? '#374151' : '#D1D5DB' }}>
              Username
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                style={{
                  borderColor: theme === 'light' ? '#D1D5DB' : '#4B5563',
                  backgroundColor: theme === 'light' ? '#FFFFFF' : '#1F2937',
                  color: theme === 'light' ? '#111827' : '#FFFFFF',
                }}
                className="w-full pl-10 pr-4 py-2 border rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: theme === 'light' ? '#374151' : '#D1D5DB' }}>
              Password
            </label>
            <div className="relative">
              <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  borderColor: theme === 'light' ? '#D1D5DB' : '#4B5563',
                  backgroundColor: theme === 'light' ? '#FFFFFF' : '#1F2937',
                  color: theme === 'light' ? '#111827' : '#FFFFFF',
                }}
                className="w-full pl-10 pr-4 py-2 border rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: theme === 'light' ? '#111827' : '#FFFFFF',
              color: theme === 'light' ? '#FFFFFF' : '#111827',
            }}
            className="w-full py-2 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:opacity-90">
            {isLoading && <Loader size={20} className="animate-spin" />}
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Credentials */}
        <div
          style={{
            borderColor: theme === 'light' ? '#E5E7EB' : '#374151',
          }}
          className="border-t pt-6">
          <p style={{ color: theme === 'light' ? '#4B5563' : '#9CA3AF' }} className="text-sm mb-3">
            Demo credentials (from DummyJSON):
          </p>
          <div className="space-y-2">
            {demoCredentials.map((cred, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setUsername(cred.username)
                  setPassword(cred.password)
                }}
                style={{
                  borderColor: theme === 'light' ? '#E5E7EB' : '#374151',
                  backgroundColor: theme === 'light' ? '#FFFFFF' : 'transparent',
                }}
                className="w-full p-3 text-left text-sm border rounded-lg transition-colors"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme === 'light' ? '#F3F4F6' : '#1F2937'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme === 'light' ? '#FFFFFF' : 'transparent'
                }}>
                <p style={{ color: theme === 'light' ? '#111827' : '#FFFFFF' }} className="font-medium">
                  {cred.username}
                </p>
                <p style={{ color: theme === 'light' ? '#6B7280' : '#9CA3AF' }} className="text-xs">
                  Click to fill credentials
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
