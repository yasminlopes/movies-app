import { forwardRef, useState } from 'react'
import { cn } from '../../utils/cn'

interface Props extends React.ComponentProps<'img'> {
  fallback?: string | React.ReactNode
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto'
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  loading?: 'lazy' | 'eager'
  showPlaceholder?: boolean
  fill?: boolean
}

export const Image = forwardRef<HTMLImageElement, Props>(
  (
    {
    className,
    src,
    alt = '',
    fallback,
    aspectRatio = 'auto',
    objectFit = 'cover',
    loading = 'lazy',
    showPlaceholder = true,
    fill = false,
    onError,
    onLoad,
    ...props
    },
    ref
  ) => {
    const [hasError, setHasError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const aspectRatioClasses = {
      square: 'aspect-square',
      video: 'aspect-video',
      portrait: 'aspect-[3/4]',
      auto: '',
    }

    const objectFitClasses = {
      cover: 'object-cover',
      contain: 'object-contain',
      fill: 'object-fill',
      none: 'object-none',
      'scale-down': 'object-scale-down',
    }

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setHasError(true)
      setIsLoading(false)
      onError?.(e)
    }

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setIsLoading(false)
      onLoad?.(e)
    }

    if (hasError && fallback) {
      if (typeof fallback === 'string') {
        return (
          <img
            ref={ref}
            src={fallback}
            alt={alt}
            className={cn(
              aspectRatioClasses[aspectRatio],
              objectFitClasses[objectFit],
              fill && 'absolute inset-0 w-full h-full',
              className
            )}
            {...props}
          />
        )
      }
      return <>{fallback}</>
    }

    return (
      <div
        className={cn(
          aspectRatioClasses[aspectRatio],
          'relative overflow-hidden',
          !fill && 'w-full h-auto'
        )}
      >
        {isLoading && showPlaceholder && (
          <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-400 text-sm">
            Carregando...
          </div>
        )}

        <img
          ref={ref}
          src={src}
          alt={alt}
          loading={loading}
          onError={handleError}
          onLoad={handleLoad}
          className={cn(
            'transition-opacity duration-300',
            objectFitClasses[objectFit],
            fill ? 'absolute inset-0 w-full h-full' : 'w-full h-auto',
            isLoading && 'opacity-0',
            !isLoading && 'opacity-100',
        className
        )}
        {...props}
    />
    </div>
)
  }
)

Image.displayName = 'Image'
