import { LucideFilter } from "lucide-react";
import { SanityDocument } from "next-sanity";
import { ProviderCard } from "@/components/provider-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/ui/page-header";
import { providers } from "@/lib/data";
import { queries } from "@/lib/groq-queries";
import { client } from "@/sanity/lib/client";

export const metadata = {
  title: "Providers",
  description: "Search and compare free and paid providers.",
};
export const revalidate = 10;
export const dynamic = "force-dynamic";

export default async function ProvidersPage() {
  const providersSanity = await client.fetch<SanityDocument[]>(
    queries.allProviders,
  );
  return (
    <div className="space-y-3">
      <PageHeader>
        <PageHeaderTitle>Providers</PageHeaderTitle>
        <PageHeaderDescription>
          Take a look at the list of providers we've gathered info on.
        </PageHeaderDescription>
      </PageHeader>
      <div>
        {providersSanity.length !== 0 ? (
          <>
            <div className="itmes-center mb-3 flex justify-between gap-2">
              <Input placeholder="Search provider" className="h-8" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-label="Toggle columns"
                    variant="outline"
                    size="sm"
                    className="ml-auto h-8 bg-background"
                  >
                    <LucideFilter className="size-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Filter providers</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem className="capitalize" checked>
                    <span className="truncate">
                      Free Providers (
                      {
                        providers.filter((provider) =>
                          provider.services_offered.map(
                            (service) => service.pricing.free_tier !== null,
                          ),
                        ).length
                      }
                      )
                    </span>
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem className="capitalize" checked>
                    <span className="truncate">
                      Serverless (
                      {
                        providers.filter((provider) => provider.is_serverless)
                          .length
                      }
                      )
                    </span>
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {providersSanity.map((provider) => (
                <ProviderCard
                  key={provider.name
                    .toLowerCase()
                    .replace(" ", "-")
                    .replace(".", "-")}
                  // @ts-ignore
                  provider={provider}
                />
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}