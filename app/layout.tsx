import type { Metadata } from "next";
import { DM_Sans, Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
// import { geistSans, geistMono, dmSans, larken, hellix } from "@/lib/fonts";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

// const larken = localFont({
//   variable: "--font-larken",
//   src: [
//     {
//       path: "../public/fonts/larken/Larken-Thin.otf",
//     },
//     {
//       path: "../public/fonts/larken/Larken-Light.otf",
//     },
//     {
//       path: "../public/fonts/larken/Larken-Regualr.otf",
//     },
//     {
//       path: "../public/fonts/larken/Larken-Medium.otf",
//     },
//     {
//       path: "../public/fonts/larken/Larken-Bold.otf",
//     },
//     {
//       path: "../public/fonts/larken/Larken-ExtraBold.otf",
//     },
//     {
//       path: "../public/fonts/larken/Larken-Black.otf",
//     },
//   ],
// });

// const hellix = localFont({
//   variable: "--font-hellix",
//   src: [
//     {
//       path: "../public/fonts/hellix/Hellix-Thin.woff2",
//     },
//     {
//       path: "../public/fonts/hellix/Hellix-Light.woff2",
//     },
//     {
//       path: "../public/fonts/hellix/Hellix-Regualr.woff2",
//     },
//     {
//       path: "../public/fonts/hellix/Hellix-Medium.woff2",
//     },
//     {
//       path: "../public/fonts/hellix/Hellix-Bold.woff2",
//     },
//     {
//       path: "../public/fonts/hellix/Hellix-SemiBold.woff2",
//     },
//     {
//       path: "../public/fonts/hellix/Hellix-ExtraBold.woff2",
//     },
//     {
//       path: "../public/fonts/hellix/Hellix-Black.woff2",
//     },
//   ],
// });

export const metadata: Metadata = {
  title: "Melchizedek Order of Jesus | Church",
  description:
    "A Christ-centered community dedicated to knowing Jesus and making Him known.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} font-dm-sans ${geistMono.variable} ${dmSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
