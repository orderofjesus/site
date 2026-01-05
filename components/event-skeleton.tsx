import { Skeleton } from "@/components/ui/skeleton";
import { PageWrapper } from "@/components/page-wrapper";

export function EventCardSkeleton() {
  return (
    <div className="group overflow-hidden border border-black/10 bg-neutral-50 dark:border-white/10 dark:bg-neutral-900">
      <Skeleton className="h-56 w-full" />
      <div className="bg-white p-6 dark:bg-neutral-900">
        <Skeleton className="mb-2 h-3 w-20" />
        <Skeleton className="mb-3 h-8 w-3/4" />
        <Skeleton className="mb-4 h-4 w-full" />
        <Skeleton className="mb-4 h-4 w-5/6" />
        
        <div className="mb-4 space-y-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-40" />
        </div>
        
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

export function EventsListSkeleton() {
  return (
    <PageWrapper>
      <section className="relative overflow-hidden px-6 pt-32 pb-20 lg:px-8">
        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Header Skeleton */}
          <div className="mt-16 mb-24 text-center">
            <Skeleton className="mx-auto mb-4 h-3 w-24" />
            <Skeleton className="mx-auto mb-6 h-16 w-64" />
            <Skeleton className="mx-auto h-6 w-full max-w-2xl" />
          </div>

          {/* Featured Event Skeleton */}
          <div className="mb-24">
            <Skeleton className="mb-8 h-10 w-48" />
            <div className="border-2 border-black/10 bg-neutral-50 dark:border-white/10 dark:bg-neutral-900">
              <div className="grid gap-0 lg:grid-cols-2">
                <Skeleton className="h-80 lg:h-auto" />
                <div className="flex flex-col justify-center bg-white p-8 lg:p-12 dark:bg-neutral-900">
                  <Skeleton className="mb-2 h-3 w-32" />
                  <Skeleton className="mb-4 h-12 w-full" />
                  <Skeleton className="mb-6 h-6 w-full" />
                  <Skeleton className="mb-6 h-6 w-5/6" />
                  
                  <div className="mb-8 space-y-3">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-56" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                  
                  <Skeleton className="h-12 w-64" />
                </div>
              </div>
            </div>
          </div>

          {/* Events Grid Skeleton */}
          <div className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-black/10 dark:bg-white/10"></div>
              <Skeleton className="h-10 w-48" />
              <div className="h-px flex-1 bg-black/10 dark:bg-white/10"></div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

export function EventDetailSkeleton() {
  return (
    <PageWrapper>
      {/* Hero Skeleton */}
      <section className="relative">
        <div className="relative h-[60vh] min-h-[500px]">
          <Skeleton className="h-full w-full" />
        </div>
      </section>

      {/* Main Content Skeleton */}
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left Column */}
            <div className="space-y-12 lg:col-span-2">
              {/* About */}
              <div>
                <Skeleton className="mb-6 h-10 w-64" />
                <Skeleton className="mb-4 h-6 w-full" />
                <Skeleton className="mb-4 h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>

              {/* Location */}
              <div>
                <Skeleton className="mb-6 h-10 w-32" />
                <div className="border border-black/10 bg-neutral-50 p-6 dark:border-white/10 dark:bg-neutral-900">
                  <Skeleton className="mb-2 h-6 w-48" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>

              {/* Schedule */}
              <div>
                <Skeleton className="mb-6 h-10 w-48" />
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-6 border-l-2 border-black/10 pb-4 pl-6 dark:border-white/10">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-5 flex-1" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Info Card */}
                <div className="border border-black/10 bg-neutral-50 p-6 dark:border-white/10 dark:bg-neutral-900">
                  <Skeleton className="mb-4 h-5 w-24" />
                  <div className="space-y-3">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>

                {/* Registration Card */}
                <div className="border-2 border-black/10 bg-white p-8 dark:border-white/10 dark:bg-neutral-900">
                  <Skeleton className="mb-6 h-8 w-40" />
                  <div className="mb-8 space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
