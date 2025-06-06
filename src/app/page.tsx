import { GithubIcon } from "@/components/icons/github";
import { ProvidersCarousel } from "@/components/providers-carousel";
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

export const revalidate = 5;

export default async function Home() {
	const providers = await client.fetch<Provider[]>(queries.allProviders);
	return (
		<div className="fade-in-0 slide-in-from-bottom-10 relative mx-auto flex h-[calc(100vh-6rem)] max-w-[90%] animate-in flex-col items-center justify-center duration-300 sm:max-w-2xl -mt-20 pt-20">
			<div className="mb-8 flex">
				{/* <Link href="/compare" className="inline-flex">
					<Badge variant="outline" className="h-8 rounded-lg">
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
				<br /> We have <strong>+{providers.length} providers</strong> added on
				the list.
			</p>
			<div className="mt-8 flex flex-col gap-2">
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
				<Button
					className="group text-muted-foreground"
					iconPlacement="right"
					Icon={ArrowUpRight}
					variant="link"
					asChild
				>
					<Link
						href="https://github.com/NoHaxito/deploys-top/issues/new?assignees=&labels=provider+request&projects=&template=request-provider.md&title=%5B%E2%9E%95%5D+Provider+Request"
						target="_blank"
						rel="noopener noreferrer"
						className="col-span-full inline-flex items-center justify-center"
					>
						Request a provider
					</Link>
				</Button>
				<ProvidersCarousel providers={providers} />
			</div>
		</div>
	);
}
