"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { cn, isAwsProvider } from "@/lib/utils";
import type { Provider } from "@/types/provider";
import { Sparkles } from "lucide-react";
import { Badge } from "./ui/badge";
import { buttonVariants } from "./ui/button";

export function DesktopMenu({
	providers,
	mostVoted,
}: { providers: Provider[]; mostVoted: Provider | null }) {
	const first6FreeProviders = providers.slice(0, 6);

	return (
		<div className="grid gap-3 p-4 md:grid-cols-[auto_minmax(auto,1fr)]">
			<div className="group relative flex h-48 flex-col overflow-hidden rounded-lg border bg-accent/50 transition-all duration-300 hover:bg-accent/90 md:h-full md:w-64">
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
					pathname === href && "!border-border bg-accent/90",
					"block select-none space-y-1 rounded-md border border-transparent p-3 leading-none no-underline outline-hidden transition-colors duration-300 hover:bg-accent/90 hover:text-accent-foreground focus:bg-accent/90 focus:text-accent-foreground data-active:bg-accent/90",
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
