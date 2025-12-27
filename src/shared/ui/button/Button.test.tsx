/**
 * Button Component Tests
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '../../context'
import { Button } from './Button'

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('Button Component', () => {
  it('renders button with text', () => {
    renderWithTheme(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = jest.fn()
    renderWithTheme(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button')
    await userEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disables button when disabled prop is true', () => {
    renderWithTheme(<Button disabled>Disabled Button</Button>)
    const button = screen.getByRole('button')

    expect(button).toBeDisabled()
  })

  it('applies primary variant styling', () => {
    renderWithTheme(<Button variant="primary">Primary</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('bg-blue-600')
  })

  it('applies secondary variant styling', () => {
    renderWithTheme(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('bg-gray-600')
  })

  it('applies custom className', () => {
    renderWithTheme(<Button className="custom-class">Custom</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('custom-class')
  })

  it('renders children correctly', () => {
    renderWithTheme(
      <Button>
        <span>Child element</span>
      </Button>,
    )

    expect(screen.getByText('Child element')).toBeInTheDocument()
  })
})
