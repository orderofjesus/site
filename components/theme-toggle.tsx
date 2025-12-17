"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="relative h-11 w-11 flex items-center justify-center">
        <div className="h-5 w-5" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative h-11 w-11 rounded-full overflow-hidden flex items-center justify-center group"
      aria-label="Toggle theme"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background with border */}
      <motion.div
        className="absolute inset-0 border-2 border-black dark:border-white"
        initial={false}
        animate={{
          backgroundColor: isDark ? "#ffffff" : "#000000",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ borderRadius: "50%" }}
      />
      
      {/* Icon container with rotation and flip */}
      <div className="relative z-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ rotate: -180, opacity: 0, scale: 0.3 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 180, opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Sun className="h-[18px] w-[18px] text-black" strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 180, opacity: 0, scale: 0.3 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -180, opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Moon className="h-[18px] w-[18px] text-white fill-white" strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hover effect - subtle pulsing ring */}
      <motion.div
        className="absolute inset-0 border-2 border-black dark:border-white rounded-full opacity-0"
        whileHover={{
          scale: [1, 1.15, 1.15],
          opacity: [0, 0.3, 0],
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </motion.button>
  );
}
