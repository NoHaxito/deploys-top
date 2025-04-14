"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { queries } from "@/lib/groq-queries";
import { cn, isAwsProvider } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import type { Provider } from "@/types/provider";
import { buttonVariants } from "./ui/button";
import { NavigationMenuContent } from "@radix-ui/react-navigation-menu";
import { Badge } from "./ui/badge";
import { Sparkles } from "lucide-react";
import { getRandomMostVotedProvider } from "@/actions/get-random-most-voted-provider";

export function DesktopMenu() {
	const [providers, setProviders] = React.useState<Provider[]>([]);
	const [mostVoted, setMostVoted] = React.useState<Provider | null>(null);

	useEffect(() => {
		async function getFreeProviders() {
			const ps = await client.fetch<Provider[]>(queries.freeProviders);
			return ps;
		}
		getFreeProviders().then((data) => {
			setProviders(data);
		});
	}, []);
	useEffect(() => {
		async function getRandomProvider() {
			const provider = await getRandomMostVotedProvider();
			return provider;
		}
		getRandomProvider().then((mostVoted) => {
			setMostVoted(JSON.parse(mostVoted) as Provider);
		});
	}, []);

	const first6FreeProviders = providers.slice(0, 6);

	return (
		<NavigationMenuContent>
			<div className="grid gap-3 p-4 md:grid-cols-[auto_minmax(auto,1fr)]">
				<div className="group relative flex h-48 flex-col overflow-hidden rounded-lg bg-accent/50 transition-all duration-300 md:h-full md:w-64 hover:bg-accent">
					{mostVoted && (
						<Link
							href={`/providers/${mostVoted?.id}`}
							className="group relative flex h-full w-full flex-col p-4"
						>
							<p className="font-medium text-lg">{mostVoted?.name}</p>
							<span className="line-clamp-2 text-muted-foreground text-sm">
								{mostVoted?.description}
							</span>
							<div
								className="absolute right-4 bottom-14 h-full w-full max-w-32 opacity-50 transition-all duration-700 group-hover:opacity-80"
								style={{
									backgroundImage: `url(${mostVoted?.icon})`,
									backgroundRepeat: "no-repeat",
									backgroundPosition: "bottom right",
									backgroundSize: "contain",
								}}
							/>
							<Badge className="mt-auto w-max gap-2">
								<Sparkles className="size-4" />
								Most Rated
							</Badge>
						</Link>
					)}
				</div>

				<ul className="grid h-64 w-[300px] grid-cols-1 gap-1 overflow-y-auto md:h-max md:w-full md:grid-cols-2">
					{first6FreeProviders.map((provider) => (
						<ListItem
							key={provider.id}
							providerIcon={provider.icon}
							href={`/providers/${provider.id}`}
							title={provider.name}
						>
							{provider.description}
						</ListItem>
					))}
					<div className="col-span-full flex items-center justify-center">
						<Link
							className={cn(buttonVariants({ variant: "link" }), "text-center")}
							href="/providers?freeProviders=true"
						>
							See all free providers ({providers.length})
						</Link>
					</div>
				</ul>
			</div>
		</NavigationMenuContent>
	);
}

export const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a"> & {
		providerIcon?: string; // because its a image (url)
	}
>(({ className, title, children, providerIcon, href, ...props }, ref) => {
	const pathname = usePathname();
	return (
		<li>
			<Link
				ref={ref}
				className={cn(
					pathname === href && "bg-accent",
					"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors duration-300 data-[active]:bg-accent focus:bg-accent hover:bg-accent focus:text-accent-foreground hover:text-accent-foreground",
					className,
				)}
				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				href={href!}
				{...props}
			>
				<div className="flex items-center gap-2">
					{providerIcon && (
						<img
							alt={`${title} logo`}
							src={providerIcon}
							className={cn(
								isAwsProvider(title as string) && "dark:aws-logo",
								"size-8 min-h-8 min-w-8",
							)}
						/>
					)}

					<div>
						<div className="flex items-center gap-2 font-medium text-[15px] leading-none">
							{title}
						</div>
						<p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
							{children}
						</p>
					</div>
				</div>
			</Link>
		</li>
	);
});
ListItem.displayName = "ListItem";
