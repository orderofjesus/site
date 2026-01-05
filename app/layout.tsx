import type { Metadata } from "next";
import { geistSans, geistMono, larken, hellix } from "@/lib/fonts";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProvider } from "@/lib/convex-provider";
import { Toaster } from "@/components/ui/sonner";

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
        className={`${geistSans.variable} ${geistMono.variable} ${larken.variable} ${hellix.variable} font-hellix antialiased`}
      >
        <ConvexClientProvider>
          {/* <AuthProvider> */}
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange={false}
          >
            {children}
            <Toaster />
          </ThemeProvider>
          {/* </AuthProvider> */}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
