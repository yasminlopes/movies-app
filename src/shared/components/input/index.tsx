import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

interface Props extends Omit<React.ComponentProps<'input'>, 'size'> { 
  label?: string;
  error?: string;
  helper?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: 'default' | 'error' | 'success';
  size?: 'sm' | 'default' | 'lg'; 
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(({
  className,
  variant = 'default',
  size = 'default',
  startIcon,
  endIcon,
  label,
  error,
  helper,
  type = 'text',
  ...props
}, ref) => {
  const baseClasses = "flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

  const variantClasses = {
    default: 'border-input',
    error: 'border-destructive focus-visible:ring-destructive',
    success: 'border-green-500 focus-visible:ring-green-500',
  }

  const sizeClasses = {
    sm: 'h-8 px-2 text-xs',
    default: 'h-10 px-3',
    lg: 'h-12 px-4 text-base',
  }

  return (
    <div className="w-full space-y-1">
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      <div className="relative">
        {startIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {startIcon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            baseClasses,
            variantClasses[variant],
            sizeClasses[size],
            startIcon && 'pl-10',
            endIcon && 'pr-10',
            className
          )}
          {...props}
        />
        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {endIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      {helper && !error && (
        <p className="text-sm text-muted-foreground">{helper}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'
