/**
 * CommentCard Component Tests
 */

import { render, screen } from '@testing-library/react'
import { CommentCard } from './CommentCard'
import { ThemeProvider } from '../../shared/context'
import type { Comment } from '../../shared/hooks/useComments'

const mockComment: Comment = {
  id: 1,
  body: 'This is a great post!',
  postId: 1,
  user: {
    id: 2,
    username: 'johndoe',
    fullName: 'John Doe',
  },
  likes: 15,
}

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('CommentCard Component', () => {
  it('renders comment body', () => {
    renderWithTheme(<CommentCard comment={mockComment} />)
    expect(screen.getByText('This is a great post!')).toBeInTheDocument()
  })

  it('displays comment author name', () => {
    renderWithTheme(<CommentCard comment={mockComment} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('displays comment author username', () => {
    renderWithTheme(<CommentCard comment={mockComment} />)
    expect(screen.getByText('@johndoe')).toBeInTheDocument()
  })

  it('displays likes count', () => {
    renderWithTheme(<CommentCard comment={mockComment} />)
    expect(screen.getByText('15')).toBeInTheDocument()
  })

  it('renders avatar with first letter of name', () => {
    renderWithTheme(<CommentCard comment={mockComment} />)
    const avatar = screen.getByText('J')
    expect(avatar).toBeInTheDocument()
  })

  it('renders with different avatar text when name is empty', () => {
    const commentNoName: Comment = {
      ...mockComment,
      user: {
        ...mockComment.user,
        fullName: '',
      },
    }
    renderWithTheme(<CommentCard comment={commentNoName} />)
    const avatar = screen.getByText('U')
    expect(avatar).toBeInTheDocument()
  })

  it('renders empty heart emoji for likes button', () => {
    renderWithTheme(<CommentCard comment={mockComment} />)
    expect(screen.getByText('❤️')).toBeInTheDocument()
  })

  it('renders comment with long body text', () => {
    const longComment: Comment = {
      ...mockComment,
      body: 'This is a very long comment that spans multiple lines and contains a lot of text. ' + 'It tests whether the component properly handles lengthy content without any issues. ' + 'The comment should be displayed in full.',
    }
    renderWithTheme(<CommentCard comment={longComment} />)
    expect(screen.getByText(/This is a very long comment/)).toBeInTheDocument()
  })

  it('handles zero likes gracefully', () => {
    const commentNoLikes: Comment = {
      ...mockComment,
      likes: 0,
    }
    renderWithTheme(<CommentCard comment={commentNoLikes} />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('renders comment card structure correctly', () => {
    const { container } = renderWithTheme(<CommentCard comment={mockComment} />)

    // Check for the main card container
    const card = container.querySelector('[class*="rounded-lg"][class*="border"]')
    expect(card).toBeInTheDocument()
  })

  it('displays special characters in comment body', () => {
    const specialComment: Comment = {
      ...mockComment,
      body: 'Great! 🎉 Check this out: http://example.com @user #hashtag',
    }
    renderWithTheme(<CommentCard comment={specialComment} />)
    expect(screen.getByText('Great! 🎉 Check this out: http://example.com @user #hashtag')).toBeInTheDocument()
  })

  it('renders with different user names', () => {
    const differentUsers: Comment[] = [
      { ...mockComment, user: { id: 1, username: 'alice', fullName: 'Alice Smith' } },
      { ...mockComment, user: { id: 2, username: 'bob', fullName: 'Bob Johnson' } },
      { ...mockComment, user: { id: 3, username: 'charlie', fullName: 'Charlie Brown' } },
    ]

    differentUsers.forEach((comment) => {
      const { unmount } = renderWithTheme(<CommentCard comment={comment} />)
      expect(screen.getByText(comment.user.fullName)).toBeInTheDocument()
      expect(screen.getByText(`@${comment.user.username}`)).toBeInTheDocument()
      unmount()
    })
  })
})
