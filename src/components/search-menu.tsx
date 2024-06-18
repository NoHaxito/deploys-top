"use client";

import * as React from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  LucideSearch,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { Provider } from "@/types/provider";
import { queries } from "@/lib/groq-queries";
import { client } from "@/sanity/lib/client";
import Image from "next/image";

export function SearchMenu() {
  const [open, setOpen] = React.useState(false);
  const [providers, setProviders] = React.useState<Provider[]>([]);
  React.useEffect(() => {
    async function fetchProviders() {
      const providers = await client.fetch<Provider[]>(queries.allProviders);
      setProviders(providers);
    }
    fetchProviders();
  }, []);
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="secondary"
        className="h-8 w-8 text-muted-foreground hover:text-primary bg-transparent sm:bg-accent p-0 sm:px-3 sm:py-2 sm:w-48 sm:justify-start"
      >
        <LucideSearch className="size-4" />
        <span className="hidden md:block">Search</span>
        <kbd className="ml-auto hidden md:inline-flex pointer-events-none text-xs h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="h-[var(--cmdk-list-height)] transition-[height] duration-300 ease-in-out">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Providers">
            {providers.map((provider) => (
              <CommandItem
                key={provider.id}
                value={provider.name}
                className="gap-3"
              >
                <img src={provider.icon} className="h-8 min-w-8 max-w-10" />
                <div>
                  <p>{provider.name}</p>
                  <span className="text-sm text-muted-foreground line-clamp-1">
                    {provider.description}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
        <div className="flex items-center justify-between bg-background border-t w-full h-[40px] p-3">
          <Image
            alt="Deploys.top logo"
            src="/deploys-top.png"
            width={24}
            height={24}
            loading="eager"
          />
          <div className="flex items-center gap-1">
            <Button
              onClick={() => setOpen(false)}
              size="sm"
              className="text-xs h-7"
              variant="ghost"
            >
              Close
              <kbd className="px-4">Esc</kbd>
            </Button>
            <Button size="sm" className="text-xs h-7" variant="ghost">
              Navigate
              <kbd>↑</kbd>
              <kbd>↓</kbd>
            </Button>
            <Button size="sm" className="text-xs h-7" variant="ghost">
              Select
              <kbd>↵</kbd>
            </Button>
          </div>
        </div>
      </CommandDialog>
    </>
  );
}
