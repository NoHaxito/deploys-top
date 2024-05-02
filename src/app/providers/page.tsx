import { LucideFilter } from "lucide-react";
import { ProviderCard } from "@/components/provider-card";
import { ProviderList } from "@/components/provider-list";
import { ProviderToolbar } from "@/components/provider-toolbar";
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
import { queries } from "@/lib/groq-queries";
import { client } from "@/sanity/lib/client";
import { Provider } from "@/types/provider";

export const metadata = {
  title: "Providers",
  description: "Search and compare free and paid providers.",
};
export const revalidate = 5;
export const dynamic = "force-dynamic";

export default async function ProvidersPage() {
  const providers = await client.fetch<Provider[]>(queries.allProviders);
  return (
    <div className="space-y-3">
      <PageHeader>
        <PageHeaderTitle>Providers</PageHeaderTitle>
        <PageHeaderDescription>
          Take a look at the list of providers we've gathered info on.
        </PageHeaderDescription>
      </PageHeader>
      <div>
        <ProviderList providers={providers} />
      </div>
    </div>
  );
}
