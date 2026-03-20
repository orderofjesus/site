"use client";

import { useState, useRef, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { PageWrapper } from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ArrowLeft,
  Clock,
  Eye,
  BookOpen,
  Star,
  Crown,
  Settings,
  Download,
  Share2,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { larken } from "@/lib/fonts";
import Link from "next/link";
import { WatchPageSkeleton } from "@/components/watch-skeleton";

export default function WatchContentPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const contentId = params.id as string;

  // Video player state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Get content details and verify access
  const content = useQuery(api.subscriptions.getContentById, { contentId });

  // Check if user has access (works for both authenticated and unauthenticated users)
  const hasAccess = useQuery(api.subscriptions.checkContentAccess, {
    userEmail: user?.email,
    contentId,
  });

  // Demo video URL
  const videoUrl = "https://www.pexels.com/download/video/35443338/";

  useEffect(() => {
    if (loading || !hasAccess) {
      return;
    }

    // If user doesn't have access, redirect based on the reason
    if (hasAccess.canAccess === false) {
      if (hasAccess.reason === "login_required") {
        // Redirect to login for subscriber-only content
        router.push(`/auth/login?returnTo=/content/${contentId}/watch`);
      } else {
        // Redirect to content detail page for other access issues
        router.push(`/content/${contentId}`);
      }
      return;
    }
  }, [loading, hasAccess, contentId, router]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (value[0] / 100) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = value[0] / 100;
    setVolume(newVolume);
    video.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      video.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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
        return "General";
    }
  };

  // Show loading while checking access
  if (loading || !hasAccess || !content) {
    return <WatchPageSkeleton />;
  }

  // If no access, return null (redirect will be handled by useEffect)
  if (hasAccess.canAccess === false) {
    return null;
  }

  return (
    <PageWrapper className="bg-black">
      <div className="mx-auto mt-36 min-h-screen max-w-440 rounded-xl px-3">
        <Link href={`/content/${contentId}`} className="cursor-pointer">
          <Button
            variant="ghost"
            size="sm"
            className="mb-10 cursor-pointer gap-x-2 rounded-none bg-black px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Content
          </Button>
        </Link>
        {/* Video Player Section */}
        <div className="relative">
          <div
            className="group relative bg-black"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <video
              ref={videoRef}
              className="aspect-video w-full object-cover"
              src={videoUrl}
              poster={content.thumbnailUrl}
            />

            {/* Video Controls Overlay */}
            <div
              className={`absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/60 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
            >
              {/* Top Controls */}
              <div className="absolute top-0 right-0 left-0 z-50 flex items-center justify-end p-6">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  onClick={togglePlay}
                  size="lg"
                  className="h-20 w-20 rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                >
                  {isPlaying ? (
                    <Pause className="h-8 w-8" fill="currentColor" />
                  ) : (
                    <Play className="ml-1 h-8 w-8" fill="currentColor" />
                  )}
                </Button>
              </div>

              {/* Bottom Controls */}
              <div className="absolute right-0 bottom-0 left-0 p-6">
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <Progress
                      value={(currentTime / duration) * 100}
                      className="h-2 cursor-pointer"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent =
                          ((e.clientX - rect.left) / rect.width) * 100;
                        handleSeek([percent]);
                      }}
                    />
                    <div className="flex items-center justify-between text-sm text-white">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={togglePlay}
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? (
                          <Pause className="h-5 w-5" />
                        ) : (
                          <Play className="h-5 w-5" />
                        )}
                      </Button>

                      <div className="flex items-center gap-2">
                        <Button
                          onClick={toggleMute}
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20"
                        >
                          {isMuted ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </Button>
                        <div className="w-24">
                          <Progress
                            value={isMuted ? 0 : volume * 100}
                            className="h-1"
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={toggleFullscreen}
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Information */}
        <div className="bg-neutral-50 px-6 py-12 dark:bg-[#0a0a0a]">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Main Content Info */}
              <div className="space-y-8 lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      {getSchoolIcon(content.school)}
                      {getSchoolName(content.school)}
                    </Badge>
                    <Badge variant="secondary">{content.contentType}</Badge>
                  </div>

                  <h1
                    className={`${larken.className} mb-6 text-4xl font-bold lg:text-5xl`}
                  >
                    {content.title}
                  </h1>

                  <p className="text-lg leading-relaxed text-black/70 dark:text-white/70">
                    {content.description}
                  </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex flex-wrap gap-6 text-sm text-black/60 dark:text-white/60"
                >
                  {content.duration && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{Math.floor(content.duration / 60)} minutes</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>Watching now</span>
                  </div>
                </motion.div>

                {/* Content Details */}
                {content.description && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="prose prose-neutral dark:prose-invert max-w-none"
                  >
                    <h3
                      className={`${larken.className} mb-4 text-2xl font-bold`}
                    >
                      About This Content
                    </h3>
                    <p className="text-black/70 dark:text-white/70">
                      {content.description}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-900"
                >
                  <h3 className={`${larken.className} mb-4 text-xl font-bold`}>
                    Your Access
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-black/60 dark:text-white/60">
                        Status
                      </span>
                      <Badge variant="default" className="bg-green-600">
                        {hasAccess.accessType === "free"
                          ? "Free Access"
                          : hasAccess.accessType === "subscription"
                            ? "Subscription"
                            : "Purchased"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-black/60 dark:text-white/60">
                        Quality
                      </span>
                      <span className="text-sm font-medium">HD 1080p</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-black/60 dark:text-white/60">
                        Download
                      </span>
                      <span className="text-sm font-medium">
                        {hasAccess.accessType === "free" && !user
                          ? "Login Required"
                          : "Available"}
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Button
                    asChild
                    className="w-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                  >
                    <Link href="/content">Browse More Content</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
