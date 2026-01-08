"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { larken } from "@/lib/fonts";

interface LoadingProps {
  message?: string;
  submessage?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

export function Loading({
  message = "Loading...",
  submessage,
  size = "md",
  fullScreen = true,
}: LoadingProps) {
  const spinnerSizes = {
    sm: "h-8 w-8",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      {/* Animated Loader */}
      <div className="mb-6 flex justify-center">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
            className={`${spinnerSizes[size]} rounded-full border-4 border-black/10 border-t-black dark:border-white/10 dark:border-t-white`}
          />
          <Loader2
            className={`${iconSizes[size]} absolute inset-0 m-auto text-black/40 dark:text-white/40`}
          />
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`${size === "lg" ? larken.className : ""} ${textSizes[size]} font-medium text-black/80 dark:text-white/80`}
      >
        {message}
      </motion.p>

      {submessage && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-2 text-sm text-black/60 dark:text-white/60"
        >
          {submessage}
        </motion.p>
      )}
    </motion.div>
  );

  if (!fullScreen) {
    return <div className="flex items-center justify-center py-12">{content}</div>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-black">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-black/5 blur-3xl dark:bg-white/5"></div>
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-black/5 blur-3xl dark:bg-white/5"></div>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        {content}
      </div>
    </div>
  );
}

// Specialized loading variants
export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const spinnerSizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className={`${spinnerSizes[size]} animate-spin rounded-full border-black/10 border-t-black dark:border-white/10 dark:border-t-white`}
    />
  );
}
