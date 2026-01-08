"use client";

import { useState, useMemo } from "react";
import { useQuery, usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { PageWrapper } from "@/components/page-wrapper";
import { SubscriptionPlans } from "@/components/subscriptions/subscription-plans";
import { ContentSkeleton } from "@/components/content-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  Search,
  Play,
  BookOpen,
  Star,
  Crown,
  Clock,
  CheckCircle,
  Lock,
  ShoppingCart,
  ArrowRight,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Filter,
  CrownIcon,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { larken } from "@/lib/fonts";
import Image from "next/image";
import { ContentImage } from "@/components/content-image";
import Link from "next/link";

export default function ContentPage() {
  const { user, loading: isLoading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<string>("all");
  const [showSubscriptionPlans, setShowSubscriptionPlans] = useState(false);

  // Memoize filters to prevent unnecessary re-renders
  const filters = useMemo(
    () => ({
      school: selectedSchool,
      searchQuery: activeSearchQuery.trim() || undefined,
    }),
    [selectedSchool, activeSearchQuery],
  );

  const handleSearch = () => {
    setActiveSearchQuery(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Get paginated content library with user access info for authenticated users
  const {
    results: contentLibrary,
    status,
    loadMore,
    isLoading: isLoadingContent,
  } = usePaginatedQuery(
    user?.email
      ? api.subscriptions.getUserContentLibrary
      : api.subscriptions.getPublicContentLibrary,
    user?.email ? { userEmail: user.email, filters } : { filters },
    { initialNumItems: 10 },
  );

  // Get user's active subscription
  const activeSubscription = useQuery(
    api.subscriptions.getUserActiveSubscription,
    user?.email ? { userEmail: user.email } : "skip",
  );

  const handleSubscribe = (planType: string) => {
    router.push(`/subscribe?plan=${planType}`);
  };

  const handlePurchase = (contentId: string) => {
    // Handle individual content purchase
    router.push(`/content/${contentId}/purchase`);
  };

  const handleStartTrial = () => {
    router.push("/subscribe");
  };

  // Content is already filtered by the backend
  const filteredContent = contentLibrary || [];

  const getSchoolIcon = (school: string) => {
    switch (school) {
      case "mystical-masterclass":
        return <BookOpen className="h-4 w-4" />;
      case "open-scroll":
        return <Star className="h-4 w-4" />;
      default:
        return <Crown className="h-4 w-4" />;
    }
  };

  const getSchoolName = (school: string) => {
    switch (school) {
      case "mystical-masterclass":
        return "Mystical Masterclass";
      case "open-scroll":
        return "Open Scroll";
      default:
        return "General";
    }
  };

  // Determine if this is the initial loading state (no filters applied yet)
  const isInitialLoading =
    status === "LoadingFirstPage" ||
    (isLoadingContent && filteredContent.length === 0);

  // if (!user) {
  //   return (
  //     <PageWrapper>
  //       <div className="flex min-h-screen items-center justify-center p-6">
  //         <div className="w-full max-w-md space-y-4 text-center">
  //           <h2 className="text-2xl font-bold">Sign In Required</h2>
  //           <p className="text-black/70 dark:text-white/70">
  //             Please sign in to access our content library
  //           </p>
  //           <Button
  //             onClick={() => router.push("/auth/login")}
  //             className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
  //           >
  //             Sign In
  //           </Button>
  //         </div>
  //       </div>
  //     </PageWrapper>
  //   );
  // }

  if (showSubscriptionPlans) {
    return (
      <PageWrapper>
        <div className="mx-auto max-w-7xl py-8">
          <Button
            variant="default"
            onClick={() => setShowSubscriptionPlans(false)}
            className="mt-24 mb-6 cursor-pointer gap-x-2 rounded-none bg-black px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            ← Back to Content
          </Button>
          <SubscriptionPlans
            onSelectPlan={(planType, billingCycle) => {
              router.push(`/subscribe?plan=${planType}&cycle=${billingCycle}`);
            }}
            currentPlan={activeSubscription?.planType}
          />
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="bg-neutral-50 dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20 lg:px-8">
        {/* Decorative Background Element */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-black/5 blur-3xl dark:bg-white/5"></div>
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-black/5 blur-3xl dark:bg-white/5"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16 mb-12 text-center"
          >
            <p className="mb-4 text-xs tracking-[0.4em] text-black/60 uppercase dark:text-white/60">
              Discover
            </p>
            <h1
              className={`${larken.className} mb-6 text-5xl font-bold md:text-7xl`}
            >
              Content Library
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-black/70 dark:text-white/70">
              Discover transformative spiritual content tailored to your
              journey. From mystical masterclasses to prophetic insights.
            </p>
          </motion.div>

          {/* Subscription Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 text-center"
          >
            {isInitialLoading ? (
              /* Skeleton loading for subscription status */
              <div className="mx-auto max-w-sm rounded-md border-2 border-black/10 bg-white p-4 dark:border-white/10 dark:bg-neutral-900">
                <div className="flex items-start gap-3">
                  <Skeleton className="mt-0.5 h-5 w-5 shrink-0 rounded" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="mt-2 h-10 w-full" />
                  </div>
                </div>
              </div>
            ) : activeSubscription ? (
              <div className="flex items-center justify-center gap-2">
                <Badge variant="default" className="bg-green-600">
                  <Crown className="mr-1 h-3 w-3" />
                  {activeSubscription.planType === "all-access"
                    ? "All-Access"
                    : getSchoolName(activeSubscription.planType)}{" "}
                  Active
                </Badge>
                {activeSubscription.status === "trial" && (
                  <Badge variant="outline">Free Trial</Badge>
                )}
              </div>
            ) : (
              <div className="mx-auto max-w-sm rounded-md border-2 border-cyan-500 bg-cyan-50 p-4 text-left dark:bg-cyan-900/20">
                <div className="flex items-start gap-3">
                  <CrownIcon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700 dark:text-cyan-400" />
                  <div className="flex-1 gap-y-3">
                    <h4 className="font-semibold text-cyan-900 dark:text-cyan-200">
                      Access Premium
                    </h4>
                    <p className="my-2 text-sm font-semibold text-cyan-800 dark:text-cyan-300">
                      Subscribe to unlock premium content and get access to our
                      whole library of deep mystical and biblical truths
                    </p>
                    <Button
                      onClick={() => setShowSubscriptionPlans(true)}
                      className="w-full cursor-pointer rounded-none bg-cyan-900 font-semibold text-white hover:bg-black/90 hover:bg-cyan-950 dark:bg-white dark:text-black dark:hover:bg-white/90"
                    >
                      View Plans
                      <ArrowRight className="ml-1 h-[20px] w-[20px]" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            {isInitialLoading ? (
              /* Skeleton loading for search and filters */
              <div className="space-y-6">
                {/* Search Bar Skeleton */}
                <div className="mx-auto max-w-lg">
                  <Skeleton className="h-14 w-full rounded-2xl" />
                </div>

                {/* Filter Pills Skeleton */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Skeleton className="h-5 w-28" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-10 w-24 rounded-full" />
                    <Skeleton className="h-10 w-36 rounded-full" />
                    <Skeleton className="h-10 w-28 rounded-full" />
                    <Skeleton className="h-10 w-20 rounded-full" />
                  </div>
                </div>

                {/* Results Info Skeleton */}
                <div className="flex justify-center">
                  <Skeleton className="h-5 w-48" />
                </div>
              </div>
            ) : (
              <>
                {/* Search Bar */}
                <div className="mb-6">
                  <div className="relative mx-auto max-w-lg">
                    <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-black/40 dark:text-white/40" />
                    <Input
                      placeholder="Search spiritual content..."
                      value={searchQuery}
                      onKeyDown={handleKeyDown}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="rounded-2xl border-2 border-black/10 bg-white/80 py-6 pr-16 pl-12 text-center text-lg font-medium shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-black/20 focus:border-black/30 dark:border-white/10 dark:bg-neutral-900/80 dark:hover:border-white/20 dark:focus:border-white/30"
                    />
                    <Button
                      onClick={handleSearch}
                      size="sm"
                      className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 transform cursor-pointer rounded-full bg-black p-0 text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60">
                    <Filter className="h-4 w-4" />
                    <span className="font-medium">Filter by school:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: "all", label: "All Content", icon: null },
                      {
                        value: "mystical-masterclass",
                        label: "Mystical Masterclass",
                        icon: BookOpen,
                      },
                      {
                        value: "open-scroll",
                        label: "Open Scroll",
                        icon: Star,
                      },
                      { value: "general", label: "General", icon: Crown },
                    ].map((filter) => {
                      const isActive = selectedSchool === filter.value;
                      const Icon = filter.icon;
                      const isDisabled = isLoadingContent;

                      return (
                        <button
                          key={filter.value}
                          onClick={() =>
                            !isDisabled && setSelectedSchool(filter.value)
                          }
                          disabled={isDisabled}
                          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                            isDisabled
                              ? "cursor-not-allowed opacity-50"
                              : isActive
                                ? "bg-black text-white shadow-md dark:bg-white dark:text-black"
                                : "border border-black/10 bg-white text-black/70 hover:border-black/20 hover:bg-black/5 dark:border-white/10 dark:bg-neutral-800 dark:text-white/70 dark:hover:border-white/20 dark:hover:bg-white/5"
                          } `}
                        >
                          {Icon && <Icon className="h-4 w-4" />}
                          <span>{filter.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Results Info */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-black/60 dark:text-white/60">
                    {isInitialLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent" />
                        {activeSearchQuery || selectedSchool !== "all"
                          ? "Searching..."
                          : "Loading content..."}
                      </span>
                    ) : (
                      <>
                        Showing {filteredContent.length} content item
                        {filteredContent.length !== 1 ? "s" : ""}
                        {activeSearchQuery && ` for "${activeSearchQuery}"`}
                        {selectedSchool !== "all" &&
                          ` in ${getSchoolName(selectedSchool)}`}
                      </>
                    )}
                  </p>

                  {/* Clear Search/Filter Button */}
                  {!isInitialLoading &&
                    (activeSearchQuery || selectedSchool !== "all") && (
                      <div className="mt-4 flex items-center justify-center gap-3">
                        <Button
                          onClick={() => {
                            setSearchQuery("");
                            setActiveSearchQuery("");
                            setSelectedSchool("all");
                          }}
                          variant="outline"
                          className="border-black/20 text-black hover:bg-black hover:text-white dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-black"
                        >
                          <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                          View All Content
                        </Button>

                        {/* Individual clear options when both search and filter are active */}
                        {activeSearchQuery && selectedSchool !== "all" && (
                          <>
                            <span className="text-xs text-black/40 dark:text-white/40">
                              or
                            </span>
                            <Button
                              onClick={() => {
                                setSearchQuery("");
                                setActiveSearchQuery("");
                              }}
                              variant="ghost"
                              size="sm"
                              className="text-xs text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
                            >
                              Clear search only
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                </div>
              </>
            )}
          </motion.div>

          {/* Content Grid */}
          {isInitialLoading ? (
            <div className="mb-12">
              <ContentSkeleton count={6} />
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {filteredContent.map((content) => (
                  <article
                    key={content._id}
                    className="group flex flex-col overflow-hidden border border-black/10 bg-white transition-colors duration-200 hover:border-black hover:shadow-lg dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white"
                  >
                    <div className="relative h-64 overflow-hidden">
                      {content.thumbnailUrl ? (
                        <ContentImage
                          src={content.thumbnailUrl}
                          alt={content.title}
                          className="h-full w-full object-cover group-hover:scale-102"
                          width={403}
                          height={256}
                          priority
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-black/5 to-black/10 dark:from-white/5 dark:to-white/10">
                          {getSchoolIcon(content.school)}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/20 transition-colors duration-200 group-hover:bg-black/30"></div>

                      {/* School indicator and Premium/Purchased badge */}
                      <div className="absolute top-4 right-4 left-4 flex items-center justify-between gap-2">
                        <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                          {getSchoolName(content.school)}
                        </div>
                        {content.hasAccess &&
                        content.accessType === "purchase" ? (
                          <div className="flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                            <CheckCircle className="h-3 w-3" />
                            Purchased
                          </div>
                        ) : content.hasAccess &&
                          content.accessType === "subscription" ? (
                          <div className="flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                            <Crown className="h-3 w-3" />
                            Included
                          </div>
                        ) : content.isSubscriberOnly ? (
                          <div className="flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                            <Lock className="h-3 w-3" />
                            Premium
                          </div>
                        ) : null}
                      </div>

                      {/* Duration */}
                      {content.duration && (
                        <div className="absolute right-4 bottom-4">
                          <div className="flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
                            <Clock className="h-3 w-3" />
                            {Math.floor(content.duration / 60)}m
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content section - flex-1 to push button to bottom */}
                    <div className="flex flex-1 flex-col p-6">
                      <p className="mb-2 text-xs tracking-[0.2em] text-black/60 uppercase dark:text-white/60">
                        {content.contentType}
                      </p>
                      <h3
                        className={`${larken.className} mb-3 text-2xl leading-tight font-bold`}
                      >
                        {content.title}
                      </h3>
                      <p className="mb-4 line-clamp-3 flex-1 text-base text-ellipsis text-black/70 dark:text-white/70">
                        {content.description}
                      </p>

                      {/* Progress bar - will be shown on individual content pages with auth */}

                      {/* Price and Action - always at bottom */}
                      <div className="mt-auto space-y-4">
                        {content.isSubscriberOnly ? (
                          <div className="flex items-center justify-between rounded-lg border border-black/10 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
                            <div className="flex items-center gap-2 text-xl font-bold">
                              <DollarSign className="h-5 w-5" />
                              {content.hasAccess &&
                              content.accessType === "purchase"
                                ? "0"
                                : (content.price / 100).toFixed(0)}
                            </div>
                            <span className="text-xs font-semibold text-black/60 dark:text-white/60">
                              {content.hasAccess &&
                              content.accessType === "purchase"
                                ? "Purchased"
                                : content.hasAccess &&
                                    content.accessType === "subscription"
                                  ? "Included in subscription"
                                  : "One-time purchase"}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between rounded-lg border border-black/10 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
                            <div className="flex items-center gap-2 text-xl font-bold">
                              <DollarSign className="h-5 w-5" />
                              <span>0</span>
                            </div>
                            <span className="text-xs font-semibold text-black/60 dark:text-white/60">
                              Free
                            </span>
                          </div>
                        )}

                        <Link
                          href={`/content/${content._id}`}
                          className="cursor-pointer"
                        >
                          <Button className="w-full cursor-pointer gap-x-2 rounded-none bg-black px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                            {content.hasAccess ? (
                              <>
                                <Play
                                  className="mr-2 h-4 w-4"
                                  fill="currentColor"
                                />
                                Watch Now
                              </>
                            ) : content.isSubscriberOnly ? (
                              <>
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                View Details
                              </>
                            ) : (
                              <>
                                <Play
                                  className="mr-2 h-4 w-4"
                                  fill="currentColor"
                                />
                                Watch Free
                              </>
                            )}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </motion.div>

              {/* Loading more skeleton */}
              {(status as string) === "LoadingMore" && (
                <div className="mb-12">
                  <ContentSkeleton count={3} />
                </div>
              )}
            </>
          )}

          {/* Pagination Controls */}
          {!isInitialLoading && filteredContent.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-24 mb-16 text-center"
            >
              <Button
                onClick={() => loadMore(10)}
                disabled={
                  status === "Exhausted" || (status as string) === "LoadingMore"
                }
                className="cursor-pointer gap-x-2 rounded-none bg-black px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {(status as string) === "LoadingMore" ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Loading more...
                  </>
                ) : status === "Exhausted" ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    No more content to display
                  </>
                ) : (
                  <>
                    Load More Content
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
              <p className="mt-3 text-sm font-semibold text-black/60 dark:text-white/60">
                {status === "Exhausted"
                  ? `Showing all ${filteredContent.length} item${filteredContent.length !== 1 ? "s" : ""}`
                  : `Showing ${filteredContent.length} item${filteredContent.length !== 1 ? "s" : ""} • More available`}
              </p>
            </motion.div>
          )}

          {/* Empty state */}
          {!isInitialLoading &&
            status === "Exhausted" &&
            filteredContent.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="py-20 text-center"
              >
                <BookOpen className="mx-auto mb-6 h-16 w-16 text-black/30 dark:text-white/30" />
                <h3 className={`${larken.className} mb-4 text-2xl font-bold`}>
                  No content found
                </h3>
                <p className="mx-auto mb-6 max-w-md text-black/70 dark:text-white/70">
                  {activeSearchQuery
                    ? `No content matches "${activeSearchQuery}"`
                    : "No content available in this category"}
                </p>
                {activeSearchQuery && (
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveSearchQuery("");
                    }}
                    className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                  >
                    Clear Search
                  </Button>
                )}
              </motion.div>
            )}
        </div>
      </section>
    </PageWrapper>
  );
}
