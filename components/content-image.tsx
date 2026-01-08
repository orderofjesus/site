"use client";

import Image from "next/image";
import { useState } from "react";
import { BookOpen, Star, Crown } from "lucide-react";

interface ContentImageProps {
  src?: string;
  alt: string;
  school?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

function getSchoolIcon(school?: string) {
  switch (school) {
    case "mystical-masterclass":
      return (
        <BookOpen className="h-12 w-12 text-black/20 dark:text-white/20" />
      );
    case "open-scroll":
      return <Star className="h-12 w-12 text-black/20 dark:text-white/20" />;
    case "general":
      return <Crown className="h-12 w-12 text-black/20 dark:text-white/20" />;
    default:
      return (
        <BookOpen className="h-12 w-12 text-black/20 dark:text-white/20" />
      );
  }
}

export function ContentImage({
  src,
  alt,
  school,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
}: ContentImageProps) {
  const [error, setError] = useState(false);

  // If no src or error loading, show fallback
  if (!src || error) {
    return (
      <div
        className={`flex items-center justify-center bg-linear-to-br from-black/5 to-black/10 dark:from-white/5 dark:to-white/10 ${fill ? "absolute inset-0" : ""} ${className || ""}`}
      >
        {getSchoolIcon(school)}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}
