// componente de imagen optimizada con lazy loading
import { ImgHTMLAttributes } from 'react'

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  priority?: boolean
}

export default function OptimizedImage({ 
  src, 
  alt, 
  priority = false,
  className = '',
  ...props 
}: OptimizedImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      {...props}
    />
  )
}
