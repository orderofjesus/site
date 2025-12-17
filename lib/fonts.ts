import { DM_Sans, Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const larken = localFont({
  variable: "--font-larken",
  src: [
    {
      path: "../public/fonts/larken/Larken-Thin.otf",
    },
    {
      path: "../public/fonts/larken/Larken-Light.otf",
    },
    {
      path: "../public/fonts/larken/Larken-Regualr.otf",
    },
    {
      path: "../public/fonts/larken/Larken-Medium.otf",
    },
    {
      path: "../public/fonts/larken/Larken-Bold.otf",
    },
    {
      path: "../public/fonts/larken/Larken-ExtraBold.otf",
    },
    {
      path: "../public/fonts/larken/Larken-Black.otf",
    },
  ],
});

export const hellix = localFont({
  variable: "--font-hellix",
  src: [
    {
      path: "../public/fonts/hellix/Hellix-Thin.woff2",
    },
    {
      path: "../public/fonts/hellix/Hellix-Light.woff2",
    },
    {
      path: "../public/fonts/hellix/Hellix-Regualr.woff2",
    },
    {
      path: "../public/fonts/hellix/Hellix-Medium.woff2",
    },
    {
      path: "../public/fonts/hellix/Hellix-Bold.woff2",
    },
    {
      path: "../public/fonts/hellix/Hellix-SemiBold.woff2",
    },
    {
      path: "../public/fonts/hellix/Hellix-ExtraBold.woff2",
    },
    {
      path: "../public/fonts/hellix/Hellix-Black.woff2",
    },
  ],
});
