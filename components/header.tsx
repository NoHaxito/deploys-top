"use client";

import { LucideCloud } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DesktopMenu, MobileMenu } from "./menu";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    document.addEventListener("scroll", () => setScrollY(window.scrollY));
    return () =>
      document.removeEventListener("scroll", () => setScrollY(window.scrollY));
  }, []);

  return (
    <header
      className={cn(
        scrollY === 0 && "!bg-transparent !border-transparent",
        "sticky top-0 z-50 w-full bg-background/95 backdrop-blur transition-colors border-b supports-[backdrop-filter]:bg-background/60",
      )}
    >
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              alt="Deploys.top logo"
              src="/deploys-top.png"
              width={32}
              height={32}
            />
            <span className="font-bold text-black dark:text-white">
              Deploys.top
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <DesktopMenu />
          <MobileMenu />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
