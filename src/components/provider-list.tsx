"use client";

import { LucideSearchX } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { type Provider } from "@/types/provider";
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
  }>({
    query: queryParams || "",
    category: categoryParams || [],
    freeProviders: Boolean(freeProviderParams ?? false),
  });

  const filteredProviders = useMemo(() => {
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
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProviders.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          ) : (
            <div className="flex h-[60vh] flex-col items-center justify-center">
              <LucideSearchX className="size-16" />
              <p className="text-2xl font-bold">No results</p>
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
