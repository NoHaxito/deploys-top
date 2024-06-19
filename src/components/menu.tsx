"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { queries } from "@/lib/groq-queries";
import { cn } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import type { Provider } from "@/types/provider";
import { buttonVariants } from "./ui/button";
import { NavigationMenuContent } from "@radix-ui/react-navigation-menu";

export function DesktopMenu() {
	const [providers, setProviders] = React.useState<Provider[]>([]);

	useEffect(() => {
		async function getFreeProviders() {
			const ps = await client.fetch<Provider[]>(queries.freeProviders);
			return ps;
		}
		getFreeProviders().then((data) => setProviders(data));
	}, []);

	const first_6_free_providers = providers.slice(0, 6);
	return (
		<NavigationMenuContent>
			<div className="grid gap-3 p-4 md:grid-cols-[auto_minmax(auto,1fr)]">
				<div className="h-48 rounded-lg bg-accent/50 backdrop-blur md:h-full md:w-56" />
				<ul className="grid h-64 w-[300px] grid-cols-1 gap-1 overflow-y-auto md:h-max md:w-full md:grid-cols-2">
					{first_6_free_providers.map((provider) => (
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
							className="size-8 min-h-8 min-w-8"
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
