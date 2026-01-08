"use client";

import { useState } from "react";
import { ContentImage } from "@/components/content-image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Lock, 
  Play, 
  Clock, 
  Users, 
  Star, 
  Crown, 
  BookOpen,
  ArrowRight,
  Check
} from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  duration?: number; // in seconds
  thumbnailUrl?: string;
  school: "mystical-masterclass" | "open-scroll" | "general";
  contentType: "video" | "course" | "bundle";
  price: number; // in cents
  isSubscriberOnly: boolean;
  previewDuration?: number; // in seconds
}

interface ContentPaywallProps {
  content: ContentItem;
  userHasAccess: boolean;
  userSubscription?: {
    planType: "all-access" | "mystical-masterclass" | "open-scroll";
    status: string;
  } | null;
  onSubscribe: (planType: string) => void;
  onPurchase: (contentId: string) => void;
  onStartTrial: () => void;
}

export function ContentPaywall({
  content,
  userHasAccess,
  userSubscription,
  onSubscribe,
  onPurchase,
  onStartTrial,
}: ContentPaywallProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

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
        return "General Content";
    }
  };

  const getRecommendedPlan = () => {
    if (content.school === "general") return "all-access";
    return content.school;
  };

  // If user has access, show access granted state
  if (userHasAccess) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-green-600 mb-4">
            <Check className="h-5 w-5" />
            <span className="font-medium">Access Granted</span>
          </div>
          <Button className="w-full" size="lg">
            <Play className="h-4 w-4 mr-2" />
            Continue Watching
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Content Preview Card */}
      <Card>
        <CardContent className="p-0">
          {/* Content Header */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
              <ContentImage 
                src={content.thumbnailUrl} 
                alt={content.title}
                school={content.school}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
            
            {/* Overlay with lock icon */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Button variant="secondary" size="lg" className="bg-white/90 hover:bg-white text-black">
                <Play className="h-4 w-4 mr-2" />
                {content.previewDuration ? 
                  `Watch ${formatDuration(content.previewDuration)} Preview` : 
                  "Watch Preview"
                }
              </Button>
            </div>
          </div>

          {/* Content Info */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    {getSchoolIcon(content.school)}
                    {getSchoolName(content.school)}
                  </Badge>
                  <Badge variant="secondary">
                    {content.contentType}
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold">{content.title}</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {content.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatDuration(content.duration)}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Premium Content
                  </div>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground mb-4">
              {showFullDescription ? content.description : `${content.description.slice(0, 150)}...`}
              {content.description.length > 150 && (
                <button 
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-primary hover:underline ml-1"
                >
                  {showFullDescription ? "Show less" : "Read more"}
                </button>
              )}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Access Options */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Subscription Option */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Subscribe & Save</CardTitle>
            </div>
            <CardDescription>
              Get unlimited access to all content with a subscription
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span>Access to all {getSchoolName(content.school)} content</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span>New releases every month</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span>Download for offline viewing</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span>7-day free trial</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Monthly Plan</span>
                <span className="text-lg font-bold">$75</span>
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Yearly Plan</span>
                <span>$720 <span className="text-green-600">(Save $180)</span></span>
              </div>
            </div>

            <Button 
              className="w-full" 
              onClick={() => onSubscribe(getRecommendedPlan())}
            >
              Start Free Trial
            </Button>
          </CardContent>
        </Card>

        {/* Individual Purchase Option */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              <CardTitle className="text-lg">Buy This Content</CardTitle>
            </div>
            <CardDescription>
              One-time purchase for lifetime access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span>Lifetime access to this content</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span>Download and keep forever</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span>No monthly commitment</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>❌ No access to other content</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="text-center">
              <div className="text-2xl font-bold">${(content.price / 100).toFixed(0)}</div>
              <div className="text-sm text-muted-foreground">One-time payment</div>
            </div>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onPurchase(content.id)}
            >
              Purchase Content
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Why Choose Subscription?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium">Complete Library</h4>
              <p className="text-muted-foreground">Access hundreds of hours of content across all schools</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium">New Releases</h4>
              <p className="text-muted-foreground">Fresh content added monthly to deepen your journey</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium">Community Access</h4>
              <p className="text-muted-foreground">Connect with fellow learners and participate in live sessions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trial CTA */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Start Your Spiritual Journey Today</h3>
          <p className="text-muted-foreground mb-4">
            Try all content free for 7 days. Cancel anytime if it's not right for you.
          </p>
          <Button size="lg" onClick={onStartTrial}>
            Start 7-Day Free Trial
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            No commitment • Cancel anytime • Full access during trial
          </p>
        </CardContent>
      </Card>
    </div>
  );
}