import { Card, CardContent } from '../../shared/components/card';

export default function MoviesListSkeleton() {
  return (
    <Card className="overflow-hidden bg-card h-full animate-pulse">
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] bg-muted flex items-center justify-center">
        </div>

        <div className="p-3 space-y-2">
          <div className="h-4 bg-muted-foreground/20 rounded w-3/4" />
          <div className="h-3 bg-muted-foreground/15 rounded w-1/4" />
        </div>
      </CardContent>
    </Card>
  );
}
