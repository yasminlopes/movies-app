import { forwardRef, useId } from 'react'
import { cn } from '../../utils/cn'

interface Option {
  value: string
  label: string
  disabled?: boolean
}

type NativeSelectProps = Omit<React.ComponentProps<'select'>, 'size' | 'onChange'>

interface Props extends NativeSelectProps {
  label?: string
  options: Option[]
  placeholder?: string
  error?: string
  helper?: string
  variant?: 'default' | 'error' | 'success'
  size?: 'sm' | 'default' | 'lg'
  className?: string
  onValueChange?: (value: string) => void
}

export const Select = forwardRef<HTMLSelectElement, Props>(({
  className,
  variant = 'default',
  size = 'default',
  options,
  placeholder,
  label,
  error,
  helper,
  onValueChange,
  id,
  ...props
}, ref) => {
  const autoId = useId()
  const selectId = id ?? `select-${autoId}`

  const baseClasses =
    'flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ' +
    'disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer'

  const variantClasses = {
    default: 'border-input',
    error: 'border-destructive focus-visible:ring-destructive',
    success: 'border-green-500 focus-visible:ring-green-500',
  } as const

  const sizeClasses = {
    sm: 'h-8 px-2 text-xs',
    default: 'h-10 px-3',
    lg: 'h-12 px-4 text-base',
  } as const

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onValueChange?.(e.target.value)
  }

  return (
    <div className="w-full space-y-1">
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          ref={ref}
          className={cn(
            baseClasses,
            variantClasses[variant],
            sizeClasses[size],
            className
          )}
          aria-invalid={!!error || undefined}
          onChange={handleChange}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* caret */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : helper ? (
        <p className="text-sm text-muted-foreground">{helper}</p>
      ) : null}
    </div>
  )
})
