import { forwardRef, useState } from 'react'
import { cn } from '../../utils/cn'

interface Props extends React.ComponentProps<'img'> {
  fallback?: string | React.ReactNode
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto'
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  loading?: 'lazy' | 'eager'
  showPlaceholder?: boolean
}

export const Image = forwardRef<HTMLImageElement, Props>(({
  className,
  src,
  alt = '',
  fallback,
  aspectRatio = 'auto',
  objectFit = 'cover',
  loading = 'lazy',
  showPlaceholder = true,
  onError,
  onLoad,
  ...props
}, ref) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    setHasError(true);
    setIsLoading(false);
    onError?.(e);
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    onLoad?.(e);
  };

  if (hasError && fallback) {
    if (typeof fallback === 'string') {
      return (
        <img
          ref={ref}
          src={fallback}
          alt={alt}
          className={cn(
            'block w-full',
            aspectRatioClasses[aspectRatio],
            objectFitClasses[objectFit],
            className
          )}
          {...props}
        />
      );
    }
    return <>{fallback}</>;
  }

  return (
    <div className={cn('relative overflow-hidden', aspectRatioClasses[aspectRatio])}>
      {isLoading && showPlaceholder && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <div className="text-muted-foreground text-sm">Carregando...</div>
        </div>
      )}
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading={loading}
        className={cn(
          'block w-full h-full transition-opacity duration-300',
          objectFitClasses[objectFit],
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
})

Image.displayName = 'Image'
