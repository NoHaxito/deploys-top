"use client";

import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideDollarSign,
  LucideGlobe,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Provider } from "@/lib/data";
import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

export function ProviderHeader({ provider }: { provider: Provider }) {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
    initialIsIntersecting: true,
  });
  return (
    <>
      <div
        ref={ref}
        className="relative flex h-[14rem] w-full flex-col items-center justify-center"
      >
        <img
          loading="lazy"
          src={provider.icon}
          className="aspect-square size-14"
        />
        <h1 className="mt-2 text-lg font-bold tracking-tight md:text-3xl">
          {provider.name}
        </h1>
        <p className="line-clamp-2 max-w-96 text-center text-sm text-muted-foreground sm:text-lg">
          {provider.description}
        </p>
        <div className="inset-x-0 -top-1 mt-4 gap-2 md:absolute md:mt-0 md:flex md:items-center md:justify-between">
          <Button
            className="hidden h-8 rounded-full md:flex"
            asChild
            variant="secondary"
          >
            <Link href={"/providers"}>
              <LucideChevronLeft className="size-4" />
              Back to providers
            </Link>
          </Button>
          <div className="flex items-center justify-between gap-2">
            <Button
              className="group h-8"
              asChild
              Icon={LucideChevronRight}
              iconPlacement="right"
            >
              <Link href={provider.href} target="_blank">
                <LucideGlobe className="size-4" />
                Website
              </Link>
            </Button>
            <Button
              variant="outline"
              className="group h-8"
              asChild
              Icon={LucideChevronRight}
              iconPlacement="right"
            >
              <Link href={provider.pricing_href} target="_blank">
                <LucideDollarSign className="size-4" />
                Pricing
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div
        className={cn(
          !isIntersecting ? "z-40 !-translate-y-[1.5rem]" : "-z-10 -translate-y-16",
          "fixed inset-x-0 top-[4rem] h-12 w-full -translate-y-16 border-b bg-background/95 p-2 backdrop-blur transition-all duration-500 supports-[backdrop-filter]:bg-background/60",
        )}
      >
        <div className="container flex max-w-screen-lg items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button
              className="size-8 rounded-full"
              variant="secondary"
              size="icon"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <LucideChevronLeft className="size-4 rotate-90" />
              <span className="sr-only">Scroll to top</span>
            </Button>
            <img src={provider.icon} className="size-8" loading="lazy" />
            <p className="text-md font-bold">{provider.name}</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <Button
              className="group h-8 w-8 p-0 md:w-fit md:px-4 md:py-2"
              asChild
            >
              <Link href={provider.href} target="_blank">
                <LucideGlobe className="size-4" />
                <span className="hidden md:block">Website</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="group h-8 w-8 p-0 md:w-fit md:px-4 md:py-2"
              asChild
            >
              <Link href={provider.pricing_href} target="_blank">
                <LucideDollarSign className="size-4" />
                <span className="hidden md:block">Pricing</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
