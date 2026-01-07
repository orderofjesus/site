"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { ContentPaywall } from "@/components/subscriptions/content-paywall";
import { SubscriptionPlans } from "@/components/subscriptions/subscription-plans";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  Play,
  BookOpen,
  Star,
  Crown,
  Clock,
  CheckCircle,
  Lock,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ContentPage() {
  const { user, loading: isLoading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<string>("all");
  const [showSubscriptionPlans, setShowSubscriptionPlans] = useState(false);

  // Get user's content library with access status
  const contentLibrary = useQuery(
    api.subscriptions.getUserContentLibrary,
    user?.email ? { userEmail: user.email } : "skip",
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

  const filteredContent =
    contentLibrary?.filter((content) => {
      const matchesSearch =
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSchool =
        selectedSchool === "all" || content.school === selectedSchool;

      return matchesSearch && matchesSchool;
    }) || [];

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

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-2 text-center">
          <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground">Loading content...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>
              Please sign in to access our content library
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => router.push("/auth/login")}>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showSubscriptionPlans) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container mx-auto py-8">
          <Button
            variant="ghost"
            onClick={() => setShowSubscriptionPlans(false)}
            className="mb-6"
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
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">Content Library</h1>
          <p className="text-muted-foreground mb-6 text-xl">
            Discover transformative spiritual content tailored to your journey
          </p>

          {/* Subscription Status */}
          {activeSubscription ? (
            <div className="mb-6 flex items-center gap-2">
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
            <div className="mb-6 flex items-center gap-4">
              <p className="text-muted-foreground">
                Subscribe to unlock premium content
              </p>
              <Button onClick={() => setShowSubscriptionPlans(true)}>
                View Plans
              </Button>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={selectedSchool} onValueChange={setSelectedSchool}>
            <TabsList>
              <TabsTrigger value="all">All Content</TabsTrigger>
              <TabsTrigger value="mystical-masterclass">
                <BookOpen className="mr-1 h-4 w-4" />
                Mystical
              </TabsTrigger>
              <TabsTrigger value="open-scroll">
                <Star className="mr-1 h-4 w-4" />
                Prophecy
              </TabsTrigger>
              <TabsTrigger value="general">
                <Crown className="mr-1 h-4 w-4" />
                General
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredContent.map((content) => (
            <Card
              key={content._id}
              className="group cursor-pointer transition-shadow hover:shadow-lg"
            >
              <div className="from-primary/20 to-primary/5 relative aspect-video overflow-hidden rounded-t-lg bg-gradient-to-br">
                {content.thumbnailUrl ? (
                  <img
                    src={content.thumbnailUrl}
                    alt={content.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    {getSchoolIcon(content.school)}
                  </div>
                )}

                {/* Access indicator */}
                <div className="absolute top-3 left-3">
                  {content.hasAccess ? (
                    <Badge variant="default" className="bg-green-600">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Access
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <Lock className="mr-1 h-3 w-3" />
                      Premium
                    </Badge>
                  )}
                </div>

                {/* Duration */}
                {content.duration && (
                  <div className="absolute right-3 bottom-3">
                    <Badge
                      variant="outline"
                      className="border-white/20 bg-black/50 text-white"
                    >
                      <Clock className="mr-1 h-3 w-3" />
                      {Math.floor(content.duration / 60)}m
                    </Badge>
                  </div>
                )}

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button size="lg" className="rounded-full">
                    <Play className="mr-2 h-5 w-5" />
                    {content.hasAccess ? "Watch" : "Preview"}
                  </Button>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {getSchoolIcon(content.school)}
                    <span className="ml-1">
                      {getSchoolName(content.school)}
                    </span>
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {content.contentType}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">
                  {content.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                  {content.description}
                </p>

                {/* Progress bar for accessed content */}
                {content.hasAccess && content.progress > 0 && (
                  <div className="mb-4">
                    <div className="text-muted-foreground mb-1 flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{content.progress}%</span>
                    </div>
                    <div className="bg-muted h-2 w-full rounded-full">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${content.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Action button */}
                {content.hasAccess ? (
                  <Button
                    className="w-full"
                    onClick={() => router.push(`/content/${content._id}`)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    {content.completed
                      ? "Watch Again"
                      : content.progress > 0
                        ? "Continue"
                        : "Watch Now"}
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-medium">
                        ${(content.price / 100).toFixed(0)}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        // Show content paywall
                        router.push(`/content/${content._id}/preview`);
                      }}
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      View Options
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {filteredContent.length === 0 && (
          <Card className="py-12 text-center">
            <CardContent>
              <BookOpen className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-semibold">No content found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? `No content matches "${searchQuery}"`
                  : "No content available in this category"}
              </p>
              {searchQuery && (
                <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
