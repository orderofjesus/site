"use client";

import { useState } from "react";
import { useQuery, useMutation, usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  CreditCard,
  Download,
  Eye,
  Settings,
  AlertTriangle,
  Crown,
  BookOpen,
  Star,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface SubscriptionManagementProps {
  userEmail: string;
}

export function SubscriptionManagement({
  userEmail,
}: SubscriptionManagementProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Queries
  const activeSubscription = useQuery(
    api.subscriptions.getUserActiveSubscription,
    { userEmail },
  );
  const allSubscriptions = useQuery(api.subscriptions.getUserSubscriptions, {
    userEmail,
  });
  const { results: contentLibrary } = usePaginatedQuery(
    api.subscriptions.getUserContentLibrary,
    { userEmail },
    { initialNumItems: 10 },
  );

  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case "all-access":
        return <Crown className="h-5 w-5" />;
      case "mystical-masterclass":
        return <BookOpen className="h-5 w-5" />;
      case "open-scroll":
        return <Star className="h-5 w-5" />;
      default:
        return <Settings className="h-5 w-5" />;
    }
  };

  const formatPlanName = (planType: string) => {
    switch (planType) {
      case "all-access":
        return "All-Access Pass";
      case "mystical-masterclass":
        return "Mystical Masterclass";
      case "open-scroll":
        return "Open Scroll";
      default:
        return planType;
    }
  };

  const handleCancelSubscription = async () => {
    if (
      !activeSubscription ||
      !confirm(
        "Are you sure you want to cancel your subscription? You'll still have access until the end of your billing period.",
      )
    ) {
      return;
    }

    setIsLoading(true);
    try {
      // Call your cancel subscription API endpoint
      const response = await fetch("/api/stripe/cancel-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionId: activeSubscription.stripeSubscriptionId,
        }),
      });

      if (!response.ok) throw new Error("Failed to cancel subscription");

      // The webhook will update the database
      alert(
        "Subscription cancelled successfully. You'll have access until the end of your billing period.",
      );
    } catch (error) {
      alert(
        "Failed to cancel subscription. Please try again or contact support.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!activeSubscription && !allSubscriptions?.length) {
    return (
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle>No Active Subscription</CardTitle>
          <CardDescription>
            Subscribe to access premium spiritual content and unlock your
            transformation journey.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button size="lg">Browse Subscription Plans</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      {/* Active Subscription */}
      {activeSubscription && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary rounded-lg p-2">
                {getPlanIcon(activeSubscription.planType)}
              </div>
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2">
                  {formatPlanName(activeSubscription.planType)}
                  <Badge
                    variant={
                      activeSubscription.status === "active"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {activeSubscription.status}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  ${(activeSubscription.price / 100).toFixed(2)} /{" "}
                  {activeSubscription.billingCycle}
                </CardDescription>
              </div>
              <div className="text-muted-foreground text-right text-sm">
                {activeSubscription.status === "trial" &&
                  activeSubscription.trialEndsAt && (
                    <div className="flex items-center gap-1 text-orange-600">
                      <AlertTriangle className="h-4 w-4" />
                      Trial ends{" "}
                      {formatDistanceToNow(
                        new Date(activeSubscription.trialEndsAt),
                        { addSuffix: true },
                      )}
                    </div>
                  )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
              <div className="flex items-center gap-2">
                <Calendar className="text-muted-foreground h-4 w-4" />
                <span>
                  Started{" "}
                  {formatDistanceToNow(new Date(activeSubscription.startDate), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="text-muted-foreground h-4 w-4" />
                <span>
                  Next billing:{" "}
                  {activeSubscription.endDate
                    ? new Date(activeSubscription.endDate).toLocaleDateString()
                    : "Ongoing"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="text-muted-foreground h-4 w-4" />
                <span>
                  Auto-renew:{" "}
                  {activeSubscription.cancelAtPeriodEnd ? "No" : "Yes"}
                </span>
              </div>
            </div>

            <Separator />

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <CreditCard className="mr-2 h-4 w-4" />
                Update Payment
              </Button>
              <Button variant="outline" size="sm">
                Change Plan
              </Button>
              {!activeSubscription.cancelAtPeriodEnd && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelSubscription}
                  disabled={isLoading}
                >
                  Cancel Subscription
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Access Overview */}
      {contentLibrary && (
        <Card>
          <CardHeader>
            <CardTitle>Your Content Library</CardTitle>
            <CardDescription>
              Access your subscribed content and track your learning progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-primary text-2xl font-bold">
                  {contentLibrary.filter((c) => c.hasAccess).length}
                </div>
                <div className="text-muted-foreground text-sm">
                  Accessible Content
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {contentLibrary.filter((c) => c.completed).length}
                </div>
                <div className="text-muted-foreground text-sm">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {
                    contentLibrary.filter(
                      (c) => c.hasAccess && c.progress > 0 && !c.completed,
                    ).length
                  }
                </div>
                <div className="text-muted-foreground text-sm">In Progress</div>
              </div>
            </div>

            {/* Recent Content */}
            <div className="space-y-3">
              <h4 className="font-medium">Recently Accessed</h4>
              {contentLibrary
                .filter((c) => c.hasAccess && c.lastAccessed)
                .sort(
                  (a, b) =>
                    new Date(b.lastAccessed!).getTime() -
                    new Date(a.lastAccessed!).getTime(),
                )
                .slice(0, 5)
                .map((content) => (
                  <div
                    key={content._id}
                    className="bg-muted/30 flex items-center gap-3 rounded-lg p-3"
                  >
                    <div className="bg-primary/10 rounded p-2">
                      {content.contentType === "video" ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <BookOpen className="h-4 w-4" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h5 className="truncate font-medium">{content.title}</h5>
                      <div className="text-muted-foreground flex items-center gap-2 text-sm">
                        <Badge variant="outline">
                          {content.school.replace("-", " ")}
                        </Badge>
                        {content.lastAccessed && (
                          <span>
                            Last accessed{" "}
                            {formatDistanceToNow(
                              new Date(content.lastAccessed),
                              { addSuffix: true },
                            )}
                          </span>
                        )}
                      </div>
                      {content.progress > 0 && (
                        <div className="mt-2">
                          <Progress value={content.progress} className="h-2" />
                          <span className="text-muted-foreground text-xs">
                            {content.progress}% complete
                          </span>
                        </div>
                      )}
                    </div>
                    <Button variant="ghost" size="sm">
                      Continue
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Billing History */}
      {allSubscriptions && allSubscriptions.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>
              View your subscription history and billing details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {allSubscriptions.map((subscription) => (
                <div
                  key={subscription._id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-muted rounded p-2">
                      {getPlanIcon(subscription.planType)}
                    </div>
                    <div>
                      <div className="font-medium">
                        {formatPlanName(subscription.planType)}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {new Date(subscription.startDate).toLocaleDateString()}{" "}
                        -{" "}
                        {subscription.endDate
                          ? new Date(subscription.endDate).toLocaleDateString()
                          : "Ongoing"}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      ${(subscription.price / 100).toFixed(2)}
                    </div>
                    <Badge
                      variant={
                        subscription.status === "active"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {subscription.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
