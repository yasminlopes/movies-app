import { SearchX } from 'lucide-react';
import { Button } from './button';
import { Link } from 'react-router';

interface Props {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export const EmptyState = ({
  title,
  description,
  actionLabel,
  actionHref,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="rounded-full bg-muted p-6 mb-6">
        <SearchX className="h-12 w-12 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
        {title}
      </h2>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        {description}
      </p>
      {actionLabel && actionHref && (
        <Link to={actionHref}>
          <Button size="lg">{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
}
