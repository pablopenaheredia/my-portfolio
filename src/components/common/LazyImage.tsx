import { useEffect, useRef, useState } from 'react'

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Componente LazyImage que usa IntersectionObserver para carga diferida real
 */
export default function LazyImage({ src, alt, className = '', width, height }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isInView, setIsInView] = useState<boolean>(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imgRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect() // Desconectar después de entrar en vista
          }
        })
      },
      {
        rootMargin: '100px' // Precargar 100px antes de entrar en la ventana de visualización
      }
    )

    observer.observe(imgRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={imgRef} className={`lazy-image-wrapper ${className}`}>
      {isInView ? (
        <img
          src={src}
          alt={alt}
    loading="lazy" // Fallback para navegadores sin IntersectionObserver
          width={width}
          height={height}
          className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
          onLoad={() => setIsLoaded(true)}
        />
      ) : (
        <div
          className={`lazy-placeholder ${className}`}
          style={{
            width: width ? `${width}px` : '100%',
            height: height ? `${height}px` : 'auto',
            background: 'rgba(255, 255, 255, 0.05)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        />
      )}
    </div>
  )
}
