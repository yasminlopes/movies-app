import { cn } from '../../utils/cn'

interface Props {
  title: string
  subtitle?: string
  children?: React.ReactNode
  className?: string
  actions?: React.ReactNode
  breadcrumb?: React.ReactNode
}

export function PageHeader({
  title,
  subtitle,
  children,
  className,
  actions,
  breadcrumb,
}: Props) {
  return (
    <div className={cn('space-y-4 pb-8', className)}>
      {breadcrumb && (
        <div className="text-sm text-muted-foreground">
          {breadcrumb}
        </div>
      )}
      
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1 flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          )}
        </div>
        
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
      
      {children && (
        <div className="mt-6">
          {children}
        </div>
      )}
    </div>
  )
}
