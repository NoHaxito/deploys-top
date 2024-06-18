import { Header } from "@/components/header";
import { ProgressBar } from "@/components/progress-bar-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";
// import "@fontsource-variable/inter";
import type React from "react";
import "./globals.css";

const interVariable = localFont({
  variable: "--font-sans",
  src: "../fonts/InterVariable.woff2",
  weight: "100 900",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deploy.nohaxito.xyz"),
  title: {
    default: "Deploys.top",
    template: "%s - Deploys.top",
  },
  description: "Search and compare free and paid providers.",
  icons: {
    icon: "/deploys-top.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://deploy.nohaxito.xyz",
    title: "Deploys.top",
    description: "Search and compare free and paid providers.",
    siteName: "Deploys.top",
    images: [
      {
        url: "https://deploy.nohaxito.xyz/api/og-image",
        width: 1200,
        height: 630,
        alt: "Deploys.top",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deploys.top",
    description: "Search and compare free and paid providers.",
    images: ["https://deploy.nohaxito.xyz/api/og-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactElement }>) {
  return (
    <html
      style={{
        scrollBehavior: "smooth",
      }}
      lang="en"
    >
      <body
        className={cn(
          interVariable.variable,
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ProgressBar />
          <div className="flex-1">
            <Header />
            {/* <div className="fixed top-0 z-[-2] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] bg-background" /> */}
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
