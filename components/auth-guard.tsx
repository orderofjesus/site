"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = !!user;

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(`/auth/login?returnTo=${pathname}`);
    }
  }, [loading, isAuthenticated, router, pathname]);

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-white dark:bg-black">
        {/* Decorative Background Elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-black/5 blur-3xl dark:bg-white/5"></div>
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-black/5 blur-3xl dark:bg-white/5"></div>
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
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
                  className="h-16 w-16 rounded-full border-4 border-black/10 border-t-black dark:border-white/10 dark:border-t-white"
                />
                <Loader2 className="absolute inset-0 m-auto h-8 w-8 text-black/40 dark:text-white/40" />
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-medium text-black/80 dark:text-white/80"
            >
              Loading...
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-2 text-sm text-black/60 dark:text-white/60"
            >
              Please wait while we authenticate you
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-white dark:bg-black">
        {/* Decorative Background Elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-black/5 blur-3xl dark:bg-white/5"></div>
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-black/5 blur-3xl dark:bg-white/5"></div>
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Animated Arrow */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="mb-6 flex justify-center"
            >
              <ArrowRight className="h-12 w-12 text-black/60 dark:text-white/60" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-medium text-black/80 dark:text-white/80"
            >
              Redirecting to login...
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-2 text-sm text-black/60 dark:text-white/60"
            >
              You'll be redirected in just a moment
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
