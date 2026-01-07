"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  CheckCircle,
  ArrowRight,
  Calendar,
  Crown,
  BookOpen,
  Star,
} from "lucide-react";

export default function SubscriptionSuccessPage() {
  const router = useRouter();
  // const searchParams = useSearchParams();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // const plan = searchParams.get("plan");
  // const cycle = searchParams.get("cycle");

  // Get user's subscription to confirm success
  const subscription = useQuery(
    api.subscriptions.getUserActiveSubscription,
    user?.email ? { userEmail: user.email } : "skip",
  );

  useEffect(() => {
    // Add a small delay to ensure the webhook has processed
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case "all-access":
        return <Crown className="text-primary h-8 w-8" />;
      case "mystical-masterclass":
        return <BookOpen className="text-primary h-8 w-8" />;
      case "open-scroll":
        return <Star className="text-primary h-8 w-8" />;
      default:
        return <CheckCircle className="text-primary h-8 w-8" />;
    }
  };

  const getPlanName = (planType: string) => {
    switch (planType) {
      case "all-access":
        return "All-Access Pass";
      case "mystical-masterclass":
        return "Mystical Masterclass";
      case "open-scroll":
        return "Open Scroll";
      default:
        return "Subscription";
    }
  };

  const getPlanFeatures = (planType: string) => {
    const commonFeatures = [
      "7-day free trial activated",
      "Download content for offline viewing",
      "Community forum access",
      "Monthly new releases",
    ];

    switch (planType) {
      case "all-access":
        return [
          ...commonFeatures,
          "Access to ALL content libraries",
          "Exclusive subscriber-only content",
          "Monthly live Q&A sessions",
          "Priority email support",
        ];
      case "mystical-masterclass":
        return [
          ...commonFeatures,
          "Complete Mystical Masterclass library",
          "Deep spiritual teachings",
          "Mystical practice guides",
        ];
      case "open-scroll":
        return [
          ...commonFeatures,
          "Complete Open Scroll library",
          "Prophetic insights and revelations",
          "Spiritual discernment training",
        ];
      default:
        return commonFeatures;
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-b-2"></div>
          <h2 className="text-xl font-semibold">
            Confirming your subscription...
          </h2>
          <p className="text-muted-foreground">This will just take a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="mx-auto max-w-3xl">
          {/* Success Header */}
          <Card className="mb-8 border-green-200 bg-linear-to-r from-green-50 to-emerald-50 dark:border-green-800 dark:from-green-950/20 dark:to-emerald-950/20">
            <CardHeader className="pb-4 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl text-green-800 dark:text-green-200">
                Welcome to Your Spiritual Journey!
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-green-300">
                Your subscription has been successfully activated
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Subscription Details */}
          {subscription && (
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    {getPlanIcon(subscription.planType)}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {getPlanName(subscription.planType)}
                      <Badge variant="default" className="bg-green-600">
                        {subscription.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      ${(subscription.price / 100).toFixed(2)} /{" "}
                      {subscription.billingCycle}
                      {subscription.trialEndsAt && (
                        <span className="ml-2 text-orange-600">
                          • Trial ends{" "}
                          {new Date(
                            subscription.trialEndsAt,
                          ).toLocaleDateString()}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-medium">What&apos;s Included:</h4>
                    <ul className="space-y-1 text-sm">
                      {getPlanFeatures(subscription.planType).map(
                        (feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-500" />
                            {feature}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="text-muted-foreground h-4 w-4" />
                      <span>
                        Started:{" "}
                        {new Date(subscription.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {subscription.trialEndsAt && (
                      <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950/30">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          <strong>Free Trial Active:</strong> You won&apos;t be
                          charged until{" "}
                          {new Date(
                            subscription.trialEndsAt,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="mb-8 grid gap-4 md:grid-cols-2">
            <Card className="cursor-pointer transition-shadow hover:shadow-md">
              <CardContent className="p-6 text-center">
                <BookOpen className="text-primary mx-auto mb-2 h-8 w-8" />
                <h3 className="mb-1 font-semibold">Start Learning</h3>
                <p className="text-muted-foreground mb-3 text-sm">
                  Dive into your content library
                </p>
                <Button
                  className="w-full"
                  onClick={() => router.push("/content")}
                >
                  Browse Content
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer transition-shadow hover:shadow-md">
              <CardContent className="p-6 text-center">
                <Crown className="text-primary mx-auto mb-2 h-8 w-8" />
                <h3 className="mb-1 font-semibold">Manage Subscription</h3>
                <p className="text-muted-foreground mb-3 text-sm">
                  View billing and settings
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push("/dashboard?tab=subscription")}
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Your Next Steps</CardTitle>
              <CardDescription>
                Here&apos;s how to get the most out of your subscription
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">
                      Explore Your Content Library
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Browse through hours of transformative spiritual content
                      tailored to your subscription level.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="bg-primary text-primary-foreground flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Join the Community</h4>
                    <p className="text-muted-foreground text-sm">
                      Connect with fellow seekers in our community forums and
                      share your spiritual journey.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="bg-primary text-primary-foreground flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Download for Offline Access</h4>
                    <p className="text-muted-foreground text-sm">
                      Download your favorite content to continue your spiritual
                      growth anywhere, anytime.
                    </p>
                  </div>
                </div>

                {subscription?.planType === "all-access" && (
                  <div className="flex gap-3">
                    <div className="bg-primary text-primary-foreground flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium">Attend Live Q&A Sessions</h4>
                      <p className="text-muted-foreground text-sm">
                        Join monthly live sessions to deepen your understanding
                        and get answers to your spiritual questions.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <div className="text-muted-foreground mt-8 text-center text-sm">
            <p>
              Need help? Contact our support team at{" "}
              <a
                href="mailto:support@melchizedekorder.com"
                className="text-primary hover:underline"
              >
                support@melchizedekorder.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
