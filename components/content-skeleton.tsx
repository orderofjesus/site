import { Skeleton } from "@/components/ui/skeleton";

interface ContentSkeletonProps {
  count?: number;
}

export function ContentSkeleton({ count = 6 }: ContentSkeletonProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden border border-black/10 bg-white dark:border-white/10 dark:bg-neutral-900"
        >
          {/* Image skeleton */}
          <div className="relative h-64">
            <Skeleton className="h-full w-full" />
            {/* School badge skeleton */}
            <div className="absolute top-4 left-4">
              <Skeleton className="h-6 w-20" />
            </div>
            {/* Access badge skeleton */}
            <div className="absolute top-4 right-4">
              <Skeleton className="h-6 w-16" />
            </div>
            {/* Duration skeleton */}
            <div className="absolute bottom-4 right-4">
              <Skeleton className="h-5 w-12" />
            </div>
          </div>

          {/* Content skeleton */}
          <div className="p-6">
            {/* Content type skeleton */}
            <Skeleton className="mb-2 h-3 w-16" />
            
            {/* Title skeleton */}
            <Skeleton className="mb-3 h-8 w-3/4" />
            
            {/* Description skeleton */}
            <div className="mb-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Price skeleton */}
            <div className="mb-4 flex items-center justify-between">
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-4 w-24" />
            </div>

            {/* Button skeleton */}
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}