import { useRef } from 'react'
import { cn } from '../utils/cn'

interface Props extends React.ComponentProps<'div'> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'
  size?: 'default' | 'sm' | 'lg'
}

export const Badge = ({
  className,
  variant = 'default',
  size = 'default',
  children,
  ...props
}: Props) =>{
  
  const ref = useRef<HTMLDivElement>(null)
  const baseClasses = "inline-flex items-center rounded-md border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

  const variantClasses = {
    default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
    secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
    outline: 'text-foreground border-border',
    success: 'border-transparent bg-green-100 text-green-800 shadow hover:bg-green-100/80 dark:bg-green-900/30 dark:text-green-400',
    warning: 'border-transparent bg-yellow-100 text-yellow-800 shadow hover:bg-yellow-100/80 dark:bg-yellow-900/30 dark:text-yellow-400',
  }

  const sizeClasses = {
    default: 'px-2.5 py-0.5 text-xs',
    sm: 'px-2 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  }

  return (
    <div
      ref={ref}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

