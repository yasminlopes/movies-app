import { cn } from '../utils/cn';

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const PageHeader = ({ title, subtitle, className }: Props) => {
  return (
    <div className={cn('mb-8', className)}>
      <h1 className="text-4xl font-bold text-foreground mb-2">{title}</h1>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </div>
  );
};
