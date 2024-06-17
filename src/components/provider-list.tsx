"use client";

import type { Provider } from "@/types/provider";
import { LucideSearchX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ProviderCard } from "./provider-card";
import { ProviderToolbar } from "./provider-toolbar";

export function ProviderList({ providers }: { providers: Provider[] }) {
  const searchParams = useSearchParams();
  const queryParams = searchParams.get("query");
  const freeProviderParams = searchParams.get("freeProviders");
  const categoryParams = searchParams.getAll("category");
  const [filter, setFilter] = useState<{
    query: string;
    category: string[];
    freeProviders: boolean;
  } | null>(null);

  const filteredProviders = useMemo(() => {
    if(!filter) return [];
    return providers.filter((provider) => {
      const categoryFilterPassed =
        filter.category.length === 0 ||
        filter.category.every((category) => {
          return provider.categories.some((c) => c.id === category);
        });
      const freeProviderFilterPassed =
        !filter.freeProviders || provider.has_free_tier;
      const queryFilterPassed =
        !filter.query ||
        provider.name.toLowerCase().includes(filter.query.toLowerCase());

      return (
        categoryFilterPassed && queryFilterPassed && freeProviderFilterPassed
      );
    });
  }, [filter]);
  useEffect(() => {
    // reset the filter to the desired values when the search params change
    setFilter({
      query: queryParams || "",
      category: categoryParams || [],
      freeProviders: Boolean(freeProviderParams ?? false),
    });
  }, [searchParams]);
  return (
    <>
      {providers.length !== 0 ? (
        <>
          <ProviderToolbar
            filter={filter}
            setFilter={setFilter}
            providers={providers}
          />
          {filteredProviders.length !== 0 ? (
            <div className="fade-in-0 slide-in-from-bottom-10 grid animate-in auto-rows-fr grid-cols-2 gap-3 duration-300 lg:grid-cols-3">
              {filteredProviders.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          ) : (
            <div className="flex h-[60vh] flex-col items-center justify-center">
              <LucideSearchX className="size-16" />
              <p className="font-bold text-2xl">No results</p>
              <span className="text-muted-foreground">
                Try with another search parameter or filter.
              </span>
            </div>
          )}
        </>
      ) : (
        <>No providers found {/* Add a UI State for this. */}</>
      )}
    </>
  );
}
