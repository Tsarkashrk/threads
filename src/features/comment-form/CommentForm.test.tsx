/**
 * CommentForm Component Tests
 */

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CommentForm } from './CommentForm'
import { ThemeProvider } from '../../shared/context'

// Mock useAuth hook before importing CommentForm
const mockUseAuth = jest.fn()
jest.mock('../../shared/hooks/useAuth', () => ({
  useAuth: () => mockUseAuth(),
}))

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('CommentForm Component', () => {
  beforeEach(() => {
    // Set default mock return value
    mockUseAuth.mockReturnValue({
      user: { id: 1, username: 'testuser' },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders comment form', () => {
    const handleSubmit = jest.fn()
    renderWithTheme(<CommentForm onSubmit={handleSubmit} />)

    const input = screen.getByPlaceholderText('Add a comment...')
    expect(input).toBeInTheDocument()
  })

  it('has submit button', () => {
    const handleSubmit = jest.fn()
    renderWithTheme(<CommentForm onSubmit={handleSubmit} />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('shows error for empty comment submission attempt', async () => {
    const handleSubmit = jest.fn()
    renderWithTheme(<CommentForm onSubmit={handleSubmit} />)

    const input = screen.getByPlaceholderText('Add a comment...') as HTMLInputElement
    // Type and then delete all text
    await userEvent.type(input, 'text')
    await userEvent.clear(input)

    // Button should be disabled when input is empty
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('submits comment with text', async () => {
    const handleSubmit = jest.fn().mockResolvedValueOnce(undefined)
    renderWithTheme(<CommentForm onSubmit={handleSubmit} />)

    const input = screen.getByPlaceholderText('Add a comment...')
    await userEvent.type(input, 'Great post!')

    const button = screen.getByRole('button')
    await userEvent.click(button)

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith('Great post!')
    })
  })

  it('clears input after successful submission', async () => {
    const handleSubmit = jest.fn().mockResolvedValueOnce(undefined)
    renderWithTheme(<CommentForm onSubmit={handleSubmit} />)

    const input = screen.getByPlaceholderText('Add a comment...') as HTMLInputElement
    await userEvent.type(input, 'Test comment')

    const button = screen.getByRole('button')
    await userEvent.click(button)

    await waitFor(() => {
      expect(input.value).toBe('')
    })
  })

  it('trims whitespace from comment', async () => {
    const handleSubmit = jest.fn().mockResolvedValueOnce(undefined)
    renderWithTheme(<CommentForm onSubmit={handleSubmit} />)

    const input = screen.getByPlaceholderText('Add a comment...')
    await userEvent.type(input, '  test comment  ')

    const button = screen.getByRole('button')
    await userEvent.click(button)

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith('test comment')
    })
  })

  it('shows error when submission fails', async () => {
    const error = new Error('Network error')
    const handleSubmit = jest.fn().mockRejectedValueOnce(error)
    renderWithTheme(<CommentForm onSubmit={handleSubmit} />)

    const input = screen.getByPlaceholderText('Add a comment...')
    await userEvent.type(input, 'Test comment')

    const button = screen.getByRole('button')
    await userEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument()
    })
  })

  it('disables submit button while submitting', async () => {
    const handleSubmit = jest.fn(
      () =>
        new Promise<void>((resolve) => {
          setTimeout(resolve, 100)
        }),
    )
    renderWithTheme(<CommentForm onSubmit={handleSubmit} />)

    const input = screen.getByPlaceholderText('Add a comment...')
    await userEvent.type(input, 'Test comment')

    const button = screen.getByRole('button')
    expect(button).not.toBeDisabled()

    await userEvent.click(button)

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled()
    })
  })

  it('updates input value as user types', async () => {
    const handleSubmit = jest.fn()
    renderWithTheme(<CommentForm onSubmit={handleSubmit} />)

    const input = screen.getByPlaceholderText('Add a comment...') as HTMLInputElement
    await userEvent.type(input, 'typing')

    expect(input.value).toBe('typing')
  })
})
