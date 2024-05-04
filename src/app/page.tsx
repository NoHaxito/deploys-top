import { ProvidersCarousel } from "@/components/providers-carousel";
import { GithubIcon } from "@/components/icons/github";
import { Button } from "@/components/ui/button";
import { queries } from "@/lib/groq-queries";
import { client } from "@/sanity/lib/client";
import type { Provider } from "@/types/provider";
import {
	ArrowUpRight,
	ChevronRight,
	LucideLayoutPanelLeft,
} from "lucide-react";
import Link from "next/link";

export default async function Home() {
	const providers = await client.fetch<Provider[]>(queries.allProviders);
	return (
		<div className="fade-in-0 slide-in-from-bottom-10 relative mx-auto flex h-[calc(100vh-4.5rem)] max-w-2xl animate-in flex-col items-center justify-center duration-300">
			<div className="mb-8 flex">
				{/* <Link href="/compare" className="inline-flex">
          <Badge variant="secondary" className="h-8 rounded-lg">
            NEW › Compare providers
            <span className="inline-flex items-center pl-2 text-black dark:text-white">
              <ArrowRight
                className="pl-0.5 text-black dark:text-white"
                size={16}
              />
            </span>
          </Badge>
        </Link> */}
			</div>
			<h2 className="text-center font-medium text-3xl text-gray-900 dark:text-gray-50 sm:text-6xl">
				Search & compare free and paid providers
			</h2>
			<p className="mt-6 text-center text-gray-600 text-lg leading-6 dark:text-gray-200">
				Find the best option for your needs quickly and easily!
				<br /> We have <strong>+{providers.length} providers</strong> added to
				the list.
			</p>
			<div className="mt-10 flex flex-col gap-2">
				<div className="flex items-center gap-2">
					<Link className="w-full" href="/providers">
						<Button
							className="group w-full"
							iconPlacement="right"
							Icon={ChevronRight}
						>
							<LucideLayoutPanelLeft className="size-4" />
							See providers
						</Button>
					</Link>
					<Link
						href="https://github.com/nohaxito/deploys-top"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex w-full items-center"
					>
						<Button
							variant="secondary"
							className="group w-full"
							iconPlacement="right"
							Icon={ArrowUpRight}
						>
							<GithubIcon className="size-4" />
							Go to GitHub
						</Button>{" "}
					</Link>
				</div>
				<Link
					href={{
						protocol: "https",
						host: "github.com",
						pathname: "/nohaxito/deploys-top/issues/new",
						query: {
							title: "Provider Request: <Insert Provider>",
							body: "<Link to the provider home page>",
						},
					}}
					target="_blank"
					rel="noopener noreferrer"
					className="col-span-full inline-flex items-center"
				>
					<Button className="w-full text-muted-foreground" variant="link">
						Request a provider
					</Button>
				</Link>
				<ProvidersCarousel providers={providers} />
			</div>
		</div>
	);
}
