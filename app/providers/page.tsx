import { LucideFilter } from "lucide-react";
import Link from "next/link";
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

export const metadata = {
  title: "Providers",
  description: "Search and compare free and paid providers.",
};

export default function ProvidersPage() {
  return (
    <div className="space-y-3">
      <PageHeader>
        <PageHeaderTitle>Providers</PageHeaderTitle>
        <PageHeaderDescription>
          Take a look at the list of providers we've gathered info on.
        </PageHeaderDescription>
      </PageHeader>
      <div>
        {providers.length !== 0 ? (
          <>
            <div className="itmes-center mb-3 flex justify-between gap-2">
              <Input placeholder="Search provider" className="h-8" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-label="Toggle columns"
                    variant="outline"
                    size="sm"
                    className="ml-auto h-8"
                  >
                    <LucideFilter className="size-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
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
              {providers.map((provider) => (
                <Link
                  key={provider.name.toLowerCase()}
                  href={`/providers/${provider.name.toLowerCase()}`}
                  className="h-full"
                >
                  <div className="flex h-full gap-4 rounded-lg border border-transparent bg-neutral-100 p-4 shadow-lg transition-[border] hover:border-primary dark:bg-neutral-900">
                    <img
                      loading="lazy"
                      draggable={false}
                      src={provider.icon}
                      className="size-8"
                      alt={`${provider.name} provider logo`}
                    />
                    <div>
                      <p className="font-bold">{provider.name}</p>
                      <span className="line-clamp-2 text-sm text-muted-foreground">
                        {provider.description}
                      </span>
                    </div>
                  </div>
                </Link>
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
