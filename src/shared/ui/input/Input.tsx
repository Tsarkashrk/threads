export interface InputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  type?: string
  disabled?: boolean
  className?: string
}

/**
 * Input Component
 * Reusable text input component
 */
export function Input({ placeholder = '', value = '', onChange, type = 'text', disabled = false, className = '' }: InputProps) {
  return (
    <input
      className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:border-gray-900 dark:focus:border-white focus:ring-2 focus:ring-offset-0 focus:ring-gray-900 dark:focus:ring-white disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60 transition-colors ${className}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
    />
  )
}
