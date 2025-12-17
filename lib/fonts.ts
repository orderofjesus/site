import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const larken = localFont({
  variable: "--font-larken",
  src: [
    {
      path: "../public/fonts/larken/Larken-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/larken/Larken-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/larken/Larken-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/larken/Larken-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/larken/Larken-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/larken/Larken-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/larken/Larken-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
});

export const hellix = localFont({
  variable: "--font-hellix",
  src: [
    {
      path: "../public/fonts/hellix/Hellix-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/hellix/Hellix-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/hellix/Hellix-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/hellix/Hellix-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/hellix/Hellix-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/hellix/Hellix-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/hellix/Hellix-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/hellix/Hellix-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});
