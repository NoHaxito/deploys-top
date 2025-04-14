"use client";

import {
	Check,
	LucideArrowRight,
	LucideCommand,
	LucideGrid2X2,
	LucideLoader2,
	LucideMonitor,
	LucideMoon,
	LucideSearch,
	LucideSun,
} from "lucide-react";
import * as React from "react";

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { requestUrl } from "@/config";
import { queries } from "@/lib/groq-queries";
import { client } from "@/sanity/lib/client";
import type { Provider } from "@/types/provider";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GithubIcon } from "./icons/github";
import { Button } from "./ui/button";

export function SearchMenu() {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);
	const [providers, setProviders] = React.useState<Provider[]>([]);
	const [loading, setLoading] = React.useState(false);
	const [search, setSearch] = React.useState<string>("");
	const [pages, setPages] = React.useState<string[]>([]);
	const { theme, setTheme } = useTheme();
	const page = React.useMemo(() => pages[pages.length - 1], [pages]);

	const fetchProviders = React.useCallback(async () => {
		try {
			setLoading(true);
			const providers = await client.fetch<Provider[]>(queries.allProviders);
			setProviders(providers);
		} catch (error) {
			console.error("Failed to fetch providers:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	React.useEffect(() => {
		if (open) {
			fetchProviders();
		}
	}, [open, fetchProviders]);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const resetSearch = () => {
		setSearch("");
		setPages([]);
	};

	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				variant="outline"
				className="h-8 w-8 bg-accent/50 hover:bg-accent/90 sm:w-max"
			>
				<LucideSearch className="size-4 min-w-4 transition-transform group-hover:scale-105" />
				<span className="hidden sm:block">Search providers...</span>
				<kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-muted-foreground text-xs opacity-100 transition-opacity group-hover:opacity-70 sm:inline-flex">
					<LucideCommand className="size-3" />K
				</kbd>
			</Button>
			<CommandDialog
				open={open}
				onOpenChange={(open) => {
					setOpen(open);
					if (!open) resetSearch();
				}}
			>
				<CommandInput
					value={search}
					onValueChange={setSearch}
					placeholder="Type a command or search..."
					className="border-0 outline-none focus:border-0 focus:outline-none focus:ring-0"
				/>

				<CommandList className="overflow-y-auto transition-all duration-300 ease-in-out">
					<CommandEmpty className="py-6 text-center text-sm">
						<p>No results found.</p>
						<p className="text-muted-foreground text-xs">
							Try searching for a provider name or feature.
						</p>
					</CommandEmpty>
					{!page && (
						<>
							<CommandGroup heading="Quick Actions">
								<CommandItem
									onSelect={() => setPages([...pages, "providers"])}
									className="flex items-center gap-2 transition-colors"
								>
									<LucideGrid2X2 className="!size-4 opacity-60" />
									<span className="flex-1">Search Providers</span>
									<LucideArrowRight className="size-3 text-muted-foreground" />
								</CommandItem>
								<CommandItem
									onSelect={() => {
										window.open(requestUrl, "_blank");
									}}
									className="flex items-center gap-2"
								>
									<GithubIcon className="!size-4" />
									<span className="flex-1">Request Provider</span>
									<span className="text-muted-foreground text-xs">
										Opens GitHub
									</span>
								</CommandItem>
							</CommandGroup>
							<CommandSeparator />
							<CommandGroup heading="Theme">
								<CommandItem
									onSelect={() => setTheme("light")}
									className="flex items-center gap-2"
								>
									<LucideSun className="!size-4 opacity-60" />
									<span className="flex-1">Light</span>
									{theme === "light" && (
										<span className="text-primary text-xs">
											<Check className="!size-4" />
										</span>
									)}
								</CommandItem>
								<CommandItem
									onSelect={() => setTheme("dark")}
									className="flex items-center gap-2"
								>
									<LucideMoon className="!size-4 opacity-60" />
									<span className="flex-1">Dark</span>
									{theme === "dark" && (
										<span className="text-primary text-xs">
											<Check className="!size-4" />
										</span>
									)}
								</CommandItem>
								<CommandItem
									onSelect={() => setTheme("system")}
									className="flex items-center gap-2"
								>
									<LucideMonitor className="!size-4 opacity-60" />
									<span className="flex-1">System</span>
									{theme === "system" && (
										<span className="text-xs text-primary">
											<Check className="!size-4" />
										</span>
									)}
								</CommandItem>
							</CommandGroup>
						</>
					)}
					{page === "providers" && (
						<CommandGroup heading="Providers">
							{loading ? (
								<div className="flex items-center justify-center py-8">
									<LucideLoader2 className="size-6 animate-spin text-muted-foreground" />
								</div>
							) : (
								providers.map((provider) => (
									<CommandItem
										onSelect={() => {
											router.push(`/providers/${provider.id}`);
											setOpen(false);
										}}
										key={provider.id}
										value={`${provider.name} ${provider.description}`}
										className="group flex items-center gap-3 py-3 transition-colors"
									>
										<div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-background/50 group-hover:bg-background">
											<img
												src={provider.icon}
												alt={`${provider.name} logo`}
												className="h-6 w-6 object-contain"
											/>
										</div>
										<div className="flex flex-col gap-1">
											<p className="font-medium leading-none">
												{provider.name}
											</p>
											<span className="line-clamp-1 text-muted-foreground text-xs">
												{provider.description}
											</span>
										</div>
									</CommandItem>
								))
							)}
						</CommandGroup>
					)}
				</CommandList>
				<div className="flex h-12 items-center justify-between border-t bg-background/95 px-3 backdrop-blur">
					<div className="flex items-center gap-2">
						<Image
							alt="Deploys.top logo"
							src="/deploys-top.png"
							width={20}
							height={20}
							className="min-w-[20] opacity-50"
						/>
						<span className="text-muted-foreground text-xs">
							{providers.length} providers available
						</span>
					</div>
					<div className="flex items-center gap-2">
						<kbd className="hidden rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
							↑↓
						</kbd>
						<span className="hidden text-muted-foreground text-xs sm:inline">
							to navigate
						</span>
						<kbd className="hidden rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
							enter
						</kbd>
						<span className="hidden text-muted-foreground text-xs sm:inline">
							to select
						</span>
						<kbd className="rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
							esc
						</kbd>
						<span className="text-xs text-muted-foreground">to close</span>
					</div>
				</div>
			</CommandDialog>
		</>
	);
}
