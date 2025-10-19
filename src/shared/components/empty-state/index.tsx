import { cn } from '../../utils/cn'

interface Props {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  className?: string
  size?: 'sm' | 'default' | 'lg'
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
  size = 'default',
}: Props) {
  const sizeClasses = {
    sm: 'py-8',
    default: 'py-12',
    lg: 'py-16',
  }

  const iconSizeClasses = {
    sm: 'w-12 h-12',
    default: 'w-16 h-16',
    lg: 'w-20 h-20',
  }

  return (
    <div className={cn(
      'flex flex-col items-center justify-center text-center',
      sizeClasses[size],
      className
    )}>
      {icon && (
        <div className={cn(
          'flex items-center justify-center rounded-full bg-muted mb-4',
          iconSizeClasses[size]
        )}>
          <div className="text-muted-foreground">
            {icon}
          </div>
        </div>
      )}
      
      <div className="space-y-2 max-w-md">
        <h3 className={cn(
          'font-semibold',
          size === 'lg' ? 'text-xl' : size === 'sm' ? 'text-base' : 'text-lg'
        )}>
          {title}
        </h3>
        
        {description && (
          <p className={cn(
            'text-muted-foreground',
            size === 'lg' ? 'text-base' : 'text-sm'
          )}>
            {description}
          </p>
        )}
      </div>
      
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  )
}
