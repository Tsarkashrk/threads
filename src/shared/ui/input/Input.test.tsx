/**
 * Input Component Tests
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input Component', () => {
  it('renders input field', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text') as HTMLInputElement
    expect(input).toBeInTheDocument()
  })

  it('renders with correct placeholder', () => {
    render(<Input placeholder="Username" />)
    const input = screen.getByPlaceholderText('Username')
    expect(input).toBeInTheDocument()
  })

  it('updates value on user input', async () => {
    const handleChange = jest.fn()
    render(<Input value="" onChange={handleChange} placeholder="Input" />)

    const input = screen.getByPlaceholderText('Input')
    await userEvent.type(input, 'hello')

    // Each character triggers onChange
    expect(handleChange).toHaveBeenCalledTimes(5)
    expect(handleChange).toHaveBeenNthCalledWith(1, 'h')
    expect(handleChange).toHaveBeenNthCalledWith(2, 'e')
    expect(handleChange).toHaveBeenNthCalledWith(3, 'l')
    expect(handleChange).toHaveBeenNthCalledWith(4, 'l')
    expect(handleChange).toHaveBeenNthCalledWith(5, 'o')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled placeholder="Disabled" />)
    const input = screen.getByPlaceholderText('Disabled') as HTMLInputElement
    expect(input).toBeDisabled()
  })

  it('is enabled when disabled prop is false', () => {
    render(<Input disabled={false} placeholder="Enabled" />)
    const input = screen.getByPlaceholderText('Enabled') as HTMLInputElement
    expect(input).not.toBeDisabled()
  })

  it('handles different input types', () => {
    render(<Input type="password" placeholder="Password" />)
    const input = screen.getByPlaceholderText('Password') as HTMLInputElement
    expect(input.type).toBe('password')
  })

  it('has type text by default', () => {
    render(<Input placeholder="Default" />)
    const input = screen.getByPlaceholderText('Default') as HTMLInputElement
    expect(input.type).toBe('text')
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" placeholder="Custom" />)
    const input = screen.getByPlaceholderText('Custom')
    expect(input).toHaveClass('custom-class')
  })

  it('does not call onChange if not provided', async () => {
    render(<Input placeholder="No handler" />)
    const input = screen.getByPlaceholderText('No handler')

    // Should not throw error
    await userEvent.type(input, 'test')
    expect(input).toBeInTheDocument()
  })

  it('displays controlled value', () => {
    const { rerender } = render(<Input value="initial" onChange={() => {}} placeholder="Controlled" />)
    const input = screen.getByPlaceholderText('Controlled') as HTMLInputElement
    expect(input.value).toBe('initial')

    rerender(<Input value="updated" onChange={() => {}} placeholder="Controlled" />)
    expect(input.value).toBe('updated')
  })
})
