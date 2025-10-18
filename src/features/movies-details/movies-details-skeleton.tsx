export default function MovieDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <div className="aspect-video lg:aspect-[16/10] bg-muted animate-pulse rounded-md" />
        </div>
        <div className="lg:col-span-7 space-y-4">
          <div className="h-8 w-3/4 bg-muted animate-pulse rounded" />
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
            <div className="h-6 w-24 bg-muted animate-pulse rounded-full" />
            <div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
          </div>
          <div className="h-4 w-40 bg-muted animate-pulse rounded" />
          <div className="h-4 w-24 bg-muted animate-pulse rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-11/12 bg-muted animate-pulse rounded" />
            <div className="h-4 w-10/12 bg-muted animate-pulse rounded" />
          </div>
          <div className="h-10 w-44 bg-muted animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
