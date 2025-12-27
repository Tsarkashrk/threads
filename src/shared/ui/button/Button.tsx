import type { ReactNode } from 'react'
import { useTheme } from '../../context'

export interface ButtonProps {
  disabled?: boolean
  onClick?: () => void
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
  'data-testid'?: string
}

export function Button({ disabled = false, onClick, children, className, variant, 'data-testid': dataTestId }: ButtonProps) {
  const { theme } = useTheme()

  const getVariantClasses = () => {
    if (variant === 'primary') return 'bg-blue-600 hover:bg-blue-700 text-white'
    if (variant === 'secondary') return 'bg-gray-600 hover:bg-gray-700 text-white'
    return ''
  }

  const baseClasses = 'flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors'
  const variantClasses = getVariantClasses()
  const finalClassName = `${baseClasses} ${variantClasses} ${className || ''}`

  return (
    <button
      data-testid={dataTestId}
      disabled={disabled}
      onClick={onClick}
      className={finalClassName}
      style={
        !variant
          ? {
              color: theme === 'light' ? '#4B5563' : '#9CA3AF',
              backgroundColor: theme === 'light' ? '#F3F4F6' : '#374151',
            }
          : undefined
      }>
      {children}
    </button>
  )
}
