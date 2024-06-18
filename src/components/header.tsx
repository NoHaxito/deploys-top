"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GithubIcon } from "./icons/github";
import { DesktopMenu, MobileMenu } from "./menu";
import { ThemeToggle } from "./theme-toggle";
import { buttonVariants } from "./ui/button";
import { motion } from "framer-motion";
import { SearchMenu } from "./search-menu";

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
        "sticky top-0 z-50 w-full transition-colors"
      )}
    >
      <div className="container flex h-16 max-w-screen-lg items-center">
        <motion.div
          initial={{ opacity: 0, y: -250 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex bg-background h-12 items-center w-full border rounded-lg p-2"
        >
          <div className="mr-2">
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
          <DesktopMenu />
          <div className="flex flex-1 items-center justify-end space-x-1">
            <SearchMenu />
            <MobileMenu />
            <ThemeToggle />
            <Link
              href="https://github.com/nohaxito/deploys-top"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-8"
              )}
            >
              <GithubIcon className="size-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
