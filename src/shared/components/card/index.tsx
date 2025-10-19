import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

interface Props extends React.ComponentProps<'div'> {
  variant?: 'default' | 'outlined' | 'elevated' | 'ghost'
  padding?: 'none' | 'sm' | 'default' | 'lg'
  hoverable?: boolean
  clickable?: boolean
}

export const Card = forwardRef<HTMLDivElement, Props>(({
  className,
  variant = 'default',
  padding = 'default',
  hoverable = false,
  clickable = false,
  children,
  ...props
}, ref) => {
  const baseClasses = "rounded-lg border bg-card text-card-foreground"

  const variantClasses = {
    default: 'border-border shadow-sm',
    outlined: 'border-border shadow-none',
    elevated: 'border-border shadow-lg',
    ghost: 'border-transparent shadow-none',
  }

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    default: 'p-6',
    lg: 'p-8',
  }

  const interactionClasses = {
    hoverable: 'transition-shadow hover:shadow-md',
    clickable: 'cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]',
    both: 'cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]',
    none: '',
  }

  const getInteractionClass = () => {
    if (clickable && hoverable) return 'both'
    if (clickable) return 'clickable'
    if (hoverable) return 'hoverable'
    return 'none'
  }

  return (
    <div
      ref={ref}
      className={cn(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        interactionClasses[getInteractionClass()],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

export const CardHeader = forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(({
  className,
  children,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 pb-6', className)}
    {...props}
  >
    {children}
  </div>
))

CardHeader.displayName = 'CardHeader'

export const CardTitle = forwardRef<HTMLHeadingElement, React.ComponentProps<'h3'>>(({
  className,
  children,
  ...props
}, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  >
    {children}
  </h3>
))

CardTitle.displayName = 'CardTitle'

export const CardDescription = forwardRef<HTMLParagraphElement, React.ComponentProps<'p'>>(({
  className,
  children,
  ...props
}, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  >
    {children}
  </p>
))

CardDescription.displayName = 'CardDescription'

export const CardContent = forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(({
  className,
  children,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn('pb-6', className)}
    {...props}
  >
    {children}
  </div>
))

CardContent.displayName = 'CardContent'

export const CardFooter = forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(({
  className,
  children,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-6', className)}
    {...props}
  >
    {children}
  </div>
))

CardFooter.displayName = 'CardFooter'
