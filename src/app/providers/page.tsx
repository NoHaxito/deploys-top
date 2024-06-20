import { ProviderList } from "@/components/providers/list";
import { Button } from "@/components/ui/button";
import {
	PageHeader,
	PageHeaderActions,
	PageHeaderDescription,
	PageHeaderTitle,
} from "@/components/ui/page-header";
import { requestUrl } from "@/config";
import { queries } from "@/lib/groq-queries";
import { client } from "@/sanity/lib/client";
import type { Provider } from "@/types/provider";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

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
				<PageHeaderActions>
					<Button
						className="group"
						iconPlacement="right"
						Icon={ArrowUpRight}
						asChild
					>
						<Link
							href={requestUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="col-span-full inline-flex items-center justify-center"
						>
							Request a provider
						</Link>
					</Button>
				</PageHeaderActions>
			</PageHeader>
			<div>
				<ProviderList providers={providers} />
			</div>
		</div>
	);
}
