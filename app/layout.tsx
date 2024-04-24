import "@fontsource-variable/inter";
import React from "react";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Deploys.top",
    template: `%s - Deploys.top`,
  },
  description: "Search and compare free and paid providers.",
  icons: {
    icon: "/deploys-top.png",
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
      <body className="min-h-screen bg-background font-['Inter_Variable'] antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex-1">
            <Header />
            <div className="fixed top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
