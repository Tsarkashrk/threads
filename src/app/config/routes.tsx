import React from 'react'
import { lazy, Suspense } from 'react'
import { ProtectedRoute } from '../routes/ProtectedRoute'

// Lazy load pages for code splitting
const LoginPage = lazy(() => import('../../pages/login'))
const HomePage = lazy(() => import('../../pages/home'))
const ProfilePage = lazy(() => import('../../pages/profile'))
const SettingsPage = lazy(() => import('../../pages/settings'))

export interface AppRoute {
  path: string
  element: React.ReactNode
  label: string
}

// Route configuration
export const APP_ROUTES: AppRoute[] = [
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPage />
      </Suspense>
    ),
    label: 'Login',
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <HomePage />
        </Suspense>
      </ProtectedRoute>
    ),
    label: 'Home',
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <ProfilePage />
        </Suspense>
      </ProtectedRoute>
    ),
    label: 'Profile',
  },
  {
    path: '/profile/:userId',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <ProfilePage />
        </Suspense>
      </ProtectedRoute>
    ),
    label: 'Profile',
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <SettingsPage />
        </Suspense>
      </ProtectedRoute>
    ),
    label: 'Settings',
  },
]
