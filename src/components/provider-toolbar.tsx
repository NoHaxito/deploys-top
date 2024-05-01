"use client";

import {
  LucideCheck,
  LucideCircleDollarSign,
  LucideFilter,
  LucideFilterX,
  LucideLoader2,
  LucideSearch,
} from "lucide-react";
import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LucideIcon } from "@/lib/lucide-icon";
import { cn } from "@/lib/utils";
import { Category } from "@/types/category";
import { Provider } from "@/types/provider";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export interface Filter {
  query: string;
  category: string[];
  freeProviders: boolean;
}

export function ProviderToolbar({
  providers,
  filter,
  setFilter,
}: {
  providers: Provider[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const categories = providers.flatMap((provider) =>
    provider.categories.map((category) => category),
  ); // refactor to receive via props
  const isFiltering =
    filter.query !== "" || filter.category.length > 0 || filter.freeProviders;
  const uniqueCategories: Category[] = Array.from(
    new Set(categories.map((category) => JSON.stringify(category))),
  ).map((category) => JSON.parse(category));
  const [isPending, startTransition] = useTransition();
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(window.location.search);
    const queryValue = e.currentTarget.value;
    setFilter({ ...filter, query: queryValue });
    if (e.currentTarget.value === "") {
      params.delete("filter.query");
    } else {
      params.set("filter.query", queryValue);
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };
  const handleFreeProvidersChange = (isSelected: boolean) => {
    const params = new URLSearchParams(window.location.search);
    if (!isSelected) {
      setFilter({ ...filter, freeProviders: true });
      params.set("filter.freeProviders", "true");
    } else {
      setFilter({ ...filter, freeProviders: false });
      params.delete("filter.freeProviders");
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };
  const handleCategoryChange = (
    category: string,
    options?: { type: "add" | "remove" },
  ) => {
    const params = new URLSearchParams(window.location.search);
    const categoryValue = category;
    if (options?.type === "add") {
      setFilter({ ...filter, category: [...filter.category, category] });
      params.append("filter.category", categoryValue);
    } else if (options?.type === "remove") {
      setFilter({
        ...filter,
        category: filter.category.filter((c) => c !== category),
      });
      params.delete("filter.category", categoryValue);
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };
  const handleResetFilters = () => {
    setFilter({ query: "", category: [], freeProviders: false });
    const params = new URLSearchParams(window.location.search);
    params.delete("filter.query");
    params.delete("filter.category");
    params.delete("filter.freeProviders");
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="mb-3 grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-between">
      <div className="relative col-span-full flex-1">
        <span className="absolute inset-y-0 left-2 flex items-center justify-center">
          <LucideSearch className="size-4" />
        </span>
        <Input
          value={filter.query}
          onChange={handleQueryChange}
          placeholder="Search provider"
          className="h-8 pl-8 pr-8 transition-[width]"
        />

        {isPending && (
          <span className="absolute inset-y-0 right-2 flex items-center justify-center">
            <LucideLoader2 className="size-4 animate-spin" />
          </span>
        )}
      </div>
      {isFiltering && (
        <Button
          aria-label="Reset filters"
          variant="outline"
          onClick={handleResetFilters}
          size="sm"
          className="ml-auto h-8 w-full bg-background sm:w-max"
        >
          <LucideFilterX className="size-4" />
          Reset filters
        </Button>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            aria-label="Toggle filters"
            variant="outline"
            size="sm"
            className={cn(
              !isFiltering && "col-span-2",
              "ml-auto h-8 w-full bg-background sm:w-max",
            )}
          >
            <LucideFilter className="size-4" />
            Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent className="ml-2 w-[250px] p-0" align="end">
          <Command>
            <CommandInput placeholder="Filter providers by:" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    handleFreeProvidersChange(filter.freeProviders);
                  }}
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-lg border border-primary",
                      filter.freeProviders
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible",
                    )}
                  >
                    <LucideCheck
                      className={cn("h-4 w-4 animate-in fade-in-0 zoom-in-95 ")}
                    />
                  </div>
                  <LucideCircleDollarSign className="size-5" />
                  Free tier
                  <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                    {providers.filter((p) => p.has_free_tier).length}
                  </span>
                </CommandItem>
                {uniqueCategories.map((category) => {
                  const isSelected = filter.category.includes(category.id);
                  return (
                    <CommandItem
                      key={category.id}
                      onSelect={() => {
                        if (isSelected) {
                          handleCategoryChange(category.id, {
                            type: "remove",
                          });
                        } else {
                          handleCategoryChange(category.id, {
                            type: "add",
                          });
                        }
                      }}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-lg border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible",
                        )}
                      >
                        <LucideCheck
                          className={cn(
                            "h-4 w-4 animate-in fade-in-0 zoom-in-95 ",
                          )}
                        />
                      </div>
                      <LucideIcon name={category.icon} className="size-5" />
                      {category.name}
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {
                          providers
                            .map((provider) => provider.categories)
                            .flat()
                            .filter((c) => c.id === category.id).length
                        }
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {filter.category.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={handleResetFilters}
                      className="justify-center text-center"
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
