export interface AvatarProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * Avatar Component
 * Displays user avatars with different sizes
 */
export function Avatar({ src, alt, size = 'md', className = '' }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  return <img className={`rounded-full object-cover ${sizeClasses[size]} ${className}`} src={src} alt={alt} />
}
