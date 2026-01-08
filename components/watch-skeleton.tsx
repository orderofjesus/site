import { Skeleton } from "@/components/ui/skeleton";
import { PageWrapper } from "@/components/page-wrapper";

export function WatchPageSkeleton() {
  return (
    <PageWrapper className="bg-black">
      <div className="mx-auto mt-28 min-h-screen max-w-440 rounded-xl">
        {/* Video Player Skeleton */}
        <div className="relative">
          <Skeleton className="aspect-video w-full bg-neutral-800" />
        </div>

        {/* Content Information Skeleton */}
        <div className="bg-neutral-50 px-6 py-12 dark:bg-[#0a0a0a]">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Main Content Info */}
              <div className="space-y-8 lg:col-span-2">
                {/* Badges */}
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-20" />
                </div>

                {/* Title */}
                <Skeleton className="h-12 w-3/4" />

                {/* Description */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                {/* Stats */}
                <div className="flex gap-6">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                </div>

                {/* About Section */}
                <div className="space-y-4">
                  <Skeleton className="h-8 w-48" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Access Card */}
                <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-900">
                  <Skeleton className="mb-4 h-6 w-32" />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>

                {/* Browse Button */}
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
