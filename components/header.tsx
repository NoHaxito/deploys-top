"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DesktopMenu, MobileMenu } from "./menu";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    document.addEventListener("scroll", () => setScrollY(window.scrollY));
    return () =>
      document.removeEventListener("scroll", () => setScrollY(window.scrollY));
  }, []);

  return (
    <header
      className={cn(
        scrollY === 0 && "!border-transparent !bg-transparent",
        pathname.startsWith("/providers/") && "!border-transparent",
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-colors supports-[backdrop-filter]:bg-background/60",
      )}
    >
      <div className="container flex h-16 max-w-screen-lg items-center">
        <div className="mr-4">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              alt="Deploys.top logo"
              src="/deploys-top.png"
              width={32}
              height={32}
              loading="eager"
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
