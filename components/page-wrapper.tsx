"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { hellix } from "@/lib/fonts";
import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className = "" }: PageWrapperProps) {
  return (
    <div
      className={`${hellix.className} min-h-screen bg-white text-black transition-colors duration-300 dark:bg-[#0a0a0a] dark:text-white ${className}`}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
}
