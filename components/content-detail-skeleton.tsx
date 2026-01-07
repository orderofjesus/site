import { Skeleton } from "@/components/ui/skeleton";
import { PageWrapper } from "@/components/page-wrapper";
import { ArrowLeft } from "lucide-react";

export function ContentDetailSkeleton() {
  return (
    <PageWrapper className="bg-neutral-50 dark:bg-[#0a0a0a]">
      {/* Back Navigation */}
      <div className="px-6 pt-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="px-6 pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              {/* Header Section */}
              <div className="mb-8">
                {/* Badges */}
                <div className="mb-6 flex items-center gap-3">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>

                {/* Title */}
                <Skeleton className="mb-4 h-12 w-full max-w-2xl" />
                <Skeleton className="mb-2 h-12 w-3/4" />

                {/* Description */}
                <div className="space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-2/3" />
                </div>
              </div>

              {/* What You'll Learn Section */}
              <div className="mb-8">
                <Skeleton className="mb-6 h-8 w-48" />
                <div className="grid gap-6 md:grid-cols-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 rounded-lg border border-black/10 bg-white/50 p-4 dark:border-white/10 dark:bg-neutral-900/50"
                    >
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Preview Section */}
              <div className="mb-8">
                <Skeleton className="mb-6 h-8 w-40" />
                
                {/* Video Preview */}
                <div className="mb-6">
                  <Skeleton className="aspect-video w-full rounded-lg" />
                  <div className="mt-4 text-center">
                    <Skeleton className="mx-auto h-6 w-64" />
                    <Skeleton className="mx-auto mt-2 h-4 w-48" />
                  </div>
                </div>

                {/* Lesson List */}
                <div className="space-y-3">
                  <Skeleton className="h-6 w-32" />
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-black/10 p-4 dark:border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-5 w-40" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-8" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Info Card */}
                <div className="border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-900">
                  <Skeleton className="mb-4 h-6 w-32" />
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Skeleton className="mt-0.5 h-4 w-4" />
                        <div className="flex-1">
                          <Skeleton className="mb-1 h-4 w-20" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Access Card */}
                <div className="border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-900">
                  {/* Price */}
                  <div className="mb-6 text-center">
                    <div className="mb-4 flex items-center justify-center gap-2">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                    <Skeleton className="mx-auto h-4 w-48" />
                  </div>

                  {/* Purchase Button */}
                  <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />

                    {/* Payment Methods */}
                    <div className="space-y-3">
                      <Skeleton className="mx-auto h-4 w-32" />
                      
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-black/10 p-4 dark:border-white/10"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Skeleton className="h-5 w-5" />
                              <Skeleton className="h-5 w-32" />
                            </div>
                            {index === 0 && <Skeleton className="h-5 w-20" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Additional Info Card */}
                <div className="border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-900">
                  <Skeleton className="mb-4 h-6 w-28" />
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}