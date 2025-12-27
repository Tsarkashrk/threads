import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProviders } from './app/providers/AppProviders'
import { MainLayout } from './app/layout/MainLayout'
import { APP_ROUTES } from './app/config/routes'

/**
 * Root App Component
 * Combines routing and global providers
 */
export function App() {
  return (
    <AppProviders>
      <Router>
        <MainLayout>
          <Routes>
            {APP_ROUTES.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </Router>
    </AppProviders>
  )
}

export default App
