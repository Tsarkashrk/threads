import type { ReactNode } from 'react'
import { Button } from '../button'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

/**
 * Modal Component
 * Reusable modal/dialog component
 */
export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <Button className="text-2xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors w-8 h-8 flex items-center justify-center" onClick={onClose} aria-label="Close modal">
            ×
          </Button>
        </div>
        <div className="p-6 sm:p-8">{children}</div>
      </div>
    </div>
  )
}
