"use client";

import { LucideStars } from "lucide-react";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { type Provider } from "@/types/provider";

export function ProviderCard({ provider }: { provider: Provider }) {
  const linkRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!linkRef.current || isFocused) return;

    const link = linkRef.current;
    const rect = link.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={linkRef}
      className="relative h-full"
    >
      <Link
        href={`/providers/${provider.id}`}
        className="relative flex h-full gap-4 overflow-hidden rounded-lg border bg-neutral-100 p-4 shadow-lg dark:bg-neutral-900"
      >
        <div
          className="pointer-events-none absolute -inset-px hidden opacity-0 transition duration-300 dark:block"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgb(38 38 38 / 0.3), transparent 40%)`,
          }}
        />
        <div
          className="pointer-events-none absolute -inset-px block opacity-0 transition duration-300 dark:hidden"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgb(229 229 229 / 0.4), transparent 40%)`,
          }}
        />
        <img
          draggable={false}
          src={provider.icon}
          className="size-8 min-h-8 min-w-8 [view-transition-name:logo]"
          alt={`${provider.name} provider logo`}
        />
        <div>
          <p className="font-bold">{provider.name}</p>
          <span className="line-clamp-2 text-sm text-muted-foreground">
            {provider.description}
          </span>
        </div>
      </Link>
      {provider.good_free_tier && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              onClick={(e) => {
                e.stopPropagation();
              }}
              size="icon"
              variant="outline"
              className="absolute right-2 top-2 z-10 size-6 rounded-full border-[#10b981a4] text-foreground hover:bg-[#10B98170] data-[state=open]:bg-[#10B98170]"
            >
              <LucideStars className="size-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="mr-1 w-max p-2 text-xs">
            Good Free Tier
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
