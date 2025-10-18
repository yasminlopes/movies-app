import { forwardRef } from 'react'
import { cn } from '../utils/cn'

interface Props extends Omit<React.ComponentProps<'img'>, 'src' | 'alt'> {
  src: string
  alt: string
  fill?: boolean
  sizes?: string
}

export const Image = forwardRef<HTMLImageElement, Props>(({
  src,
  alt,
  fill = false,
  className,
  sizes,
  ...props
}, ref) => {
  const fillClasses = fill ? "absolute inset-0 w-full h-full" : ""

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      sizes={sizes}
      className={cn(fillClasses, className)}
      {...props}
    />
  )
})

Image.displayName = "Image"
