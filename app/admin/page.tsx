"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Users,
  CreditCard,
  TrendingUp,
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Crown,
  BookOpen,
  Star,
  Activity,
  Search,
  Download,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface SubscriptionAnalytics {
  totalActiveSubscriptions: number;
  monthlyRecurringRevenue: number;
  churnRate: number;
  trialConversions: number;
  totalRevenue: number;
  newSubscriptionsThisMonth: number;
  cancelledSubscriptionsThisMonth: number;
}

export default function AdminDashboard() {
  const { user, loading: isLoading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Check if user is admin (you'll need to implement admin role checking)
  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  // Get all subscriptions for analytics
  const allSubscriptions = useQuery(api.subscriptions.getAllSubscriptions, {});
  const contentLibrary = useQuery(api.subscriptions.getAllContent, {});

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-2 text-center">
          <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Admin Access Required</CardTitle>
            <CardDescription>
              Please sign in with an admin account
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => router.push("/auth/login")}>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don&apos;t have permission to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate analytics
  const activeSubscriptions =
    allSubscriptions?.filter((sub) => sub.status === "active") || [];
  const trialSubscriptions =
    allSubscriptions?.filter((sub) => sub.status === "trial") || [];
  const cancelledSubscriptions =
    allSubscriptions?.filter((sub) => sub.status === "cancelled") || [];

  const monthlyRevenue = activeSubscriptions
    .filter((sub) => sub.billingCycle === "monthly")
    .reduce((sum, sub) => sum + sub.price, 0);

  const yearlyRevenue = activeSubscriptions
    .filter((sub) => sub.billingCycle === "yearly")
    .reduce((sum, sub) => sum + sub.price / 12, 0); // Convert to monthly equivalent

  const totalMRR = monthlyRevenue + yearlyRevenue;

  const analytics: SubscriptionAnalytics = {
    totalActiveSubscriptions: activeSubscriptions.length,
    monthlyRecurringRevenue: totalMRR,
    churnRate:
      (cancelledSubscriptions.length / (allSubscriptions?.length || 1)) * 100,
    trialConversions:
      (activeSubscriptions.length /
        (trialSubscriptions.length + activeSubscriptions.length)) *
      100,
    totalRevenue:
      allSubscriptions?.reduce((sum, sub) => sum + sub.price, 0) || 0,
    newSubscriptionsThisMonth: activeSubscriptions.filter(
      (sub) => new Date(sub.createdAt).getMonth() === new Date().getMonth(),
    ).length,
    cancelledSubscriptionsThisMonth: cancelledSubscriptions.filter(
      (sub) =>
        sub.endDate &&
        new Date(sub.endDate).getMonth() === new Date().getMonth(),
    ).length,
  };

  const planBreakdown = activeSubscriptions.reduce(
    (acc, sub) => {
      acc[sub.planType] = (acc[sub.planType] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground text-xl">
            Subscription and content management
          </p>
        </div>

        {/* Analytics Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Subscribers
              </CardTitle>
              <Users className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.totalActiveSubscriptions}
              </div>
              <p className="text-muted-foreground text-xs">
                +{analytics.newSubscriptionsThisMonth} this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Revenue
              </CardTitle>
              <DollarSign className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(analytics.monthlyRecurringRevenue / 100).toLocaleString()}
              </div>
              <p className="text-muted-foreground text-xs">
                MRR including annual plans
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
              <TrendingUp className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.churnRate.toFixed(1)}%
              </div>
              <p className="text-muted-foreground text-xs">
                -{analytics.cancelledSubscriptionsThisMonth} this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Trial Conversion
              </CardTitle>
              <CheckCircle className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.trialConversions.toFixed(1)}%
              </div>
              <p className="text-muted-foreground text-xs">
                {trialSubscriptions.length} active trials
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="subscriptions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="content">Content Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions" className="space-y-6">
            {/* Plan Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Plan Distribution</CardTitle>
                <CardDescription>
                  Active subscribers by plan type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="bg-muted/30 flex items-center gap-3 rounded-lg p-4">
                    <Crown className="text-primary h-8 w-8" />
                    <div>
                      <h3 className="font-semibold">All-Access</h3>
                      <p className="text-2xl font-bold">
                        {planBreakdown["all-access"] || 0}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        subscribers
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted/30 flex items-center gap-3 rounded-lg p-4">
                    <BookOpen className="text-primary h-8 w-8" />
                    <div>
                      <h3 className="font-semibold">Mystical Masterclass</h3>
                      <p className="text-2xl font-bold">
                        {planBreakdown["mystical-masterclass"] || 0}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        subscribers
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted/30 flex items-center gap-3 rounded-lg p-4">
                    <Star className="text-primary h-8 w-8" />
                    <div>
                      <h3 className="font-semibold">Open Scroll</h3>
                      <p className="text-2xl font-bold">
                        {planBreakdown["open-scroll"] || 0}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        subscribers
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Subscriptions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Subscriptions</CardTitle>
                    <CardDescription>
                      Latest subscription activity
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {allSubscriptions?.slice(0, 10).map((subscription) => (
                    <div
                      key={subscription._id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded p-2">
                          {subscription.planType === "all-access" && (
                            <Crown className="h-4 w-4" />
                          )}
                          {subscription.planType === "mystical-masterclass" && (
                            <BookOpen className="h-4 w-4" />
                          )}
                          {subscription.planType === "open-scroll" && (
                            <Star className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">
                            {subscription.userEmail}
                          </div>
                          <div className="text-muted-foreground text-sm">
                            {subscription.planType.replace("-", " ")} •{" "}
                            {subscription.billingCycle}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            subscription.status === "active"
                              ? "default"
                              : subscription.status === "trial"
                                ? "secondary"
                                : subscription.status === "cancelled"
                                  ? "destructive"
                                  : "outline"
                          }
                        >
                          {subscription.status}
                        </Badge>
                        <div className="text-muted-foreground mt-1 text-sm">
                          ${(subscription.price / 100).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Content Library</CardTitle>
                    <CardDescription>
                      Manage your spiritual content
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export Content
                    </Button>
                    <Button size="sm">Add Content</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                    <Input
                      placeholder="Search content..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {contentLibrary
                    ?.filter(
                      (content) =>
                        content.title
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        content.description
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()),
                    )
                    .slice(0, 10)
                    .map((content) => (
                      <div
                        key={content._id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-muted rounded p-2">
                            {content.contentType === "video" && (
                              <Activity className="h-4 w-4" />
                            )}
                            {content.contentType === "course" && (
                              <BookOpen className="h-4 w-4" />
                            )}
                            {content.contentType === "bundle" && (
                              <Crown className="h-4 w-4" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate font-medium">
                              {content.title}
                            </div>
                            <div className="text-muted-foreground flex items-center gap-2 text-sm">
                              <Badge variant="outline">
                                {content.school.replace("-", " ")}
                              </Badge>
                              <Badge variant="secondary">
                                {content.contentType}
                              </Badge>
                              <span>${(content.price / 100).toFixed(0)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              content.isPublished ? "default" : "secondary"
                            }
                          >
                            {content.isPublished ? "Published" : "Draft"}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>
                    Monthly vs Yearly subscriptions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Monthly subscriptions:</span>
                      <span className="font-medium">
                        ${(monthlyRevenue / 100).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual subscriptions (monthly equivalent):</span>
                      <span className="font-medium">
                        ${(yearlyRevenue / 100).toLocaleString()}
                      </span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total MRR:</span>
                        <span>${(totalMRR / 100).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subscription Health</CardTitle>
                  <CardDescription>Key metrics overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Active subscriptions:</span>
                      <span className="font-medium text-green-600">
                        {analytics.totalActiveSubscriptions}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Trial accounts:</span>
                      <span className="font-medium text-blue-600">
                        {trialSubscriptions.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cancelled subscriptions:</span>
                      <span className="font-medium text-red-600">
                        {cancelledSubscriptions.length}
                      </span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span>Churn rate:</span>
                        <span
                          className={`font-medium ${analytics.churnRate > 10 ? "text-red-600" : "text-green-600"}`}
                        >
                          {analytics.churnRate.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Items */}
            <Card>
              <CardHeader>
                <CardTitle>Action Items</CardTitle>
                <CardDescription>
                  Things that need your attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trialSubscriptions.filter((sub) => {
                    const trialEnd = new Date(sub.trialEndsAt || "");
                    const daysLeft = Math.ceil(
                      (trialEnd.getTime() - new Date().getTime()) /
                        (1000 * 60 * 60 * 24),
                    );
                    return daysLeft <= 2;
                  }).length > 0 && (
                    <div className="flex items-center gap-3 rounded-lg border border-orange-200 bg-orange-50 p-3 dark:border-orange-800 dark:bg-orange-950/30">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <div>
                        <h4 className="font-medium">Trials ending soon</h4>
                        <p className="text-muted-foreground text-sm">
                          {
                            trialSubscriptions.filter((sub) => {
                              const trialEnd = new Date(sub.trialEndsAt || "");
                              const daysLeft = Math.ceil(
                                (trialEnd.getTime() - new Date().getTime()) /
                                  (1000 * 60 * 60 * 24),
                              );
                              return daysLeft <= 2;
                            }).length
                          }{" "}
                          trials ending in the next 2 days
                        </p>
                      </div>
                    </div>
                  )}

                  {analytics.churnRate > 10 && (
                    <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-950/30">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <h4 className="font-medium">High churn rate</h4>
                        <p className="text-muted-foreground text-sm">
                          Churn rate is above 10%. Consider retention
                          strategies.
                        </p>
                      </div>
                    </div>
                  )}

                  {contentLibrary &&
                    contentLibrary?.filter((c) => !c.isPublished).length >
                      0 && (
                      <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950/30">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium">Unpublished content</h4>
                          <p className="text-muted-foreground text-sm">
                            {
                              contentLibrary?.filter((c) => !c.isPublished)
                                .length
                            }{" "}
                            items ready to publish
                          </p>
                        </div>
                      </div>
                    )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
