"use client";

import * as React from "react";
import {
	LucideGrid2X2,
	LucideMonitor,
	LucideMoon,
	LucideSearch,
	LucideSun,
} from "lucide-react";

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import type { Provider } from "@/types/provider";
import { queries } from "@/lib/groq-queries";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { GithubIcon } from "./icons/github";
import { requestUrl } from "@/config";
import { useRouter } from "next/navigation";

export function SearchMenu() {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);
	const [providers, setProviders] = React.useState<Provider[]>([]);
	const [search, setSearch] = React.useState<string>("");
	const [pages, setPages] = React.useState<string[]>([]);
	const { setTheme } = useTheme();
	const page = React.useMemo(() => pages[pages.length - 1], [pages]);
	React.useEffect(() => {
		async function fetchProviders() {
			const providers = await client.fetch<Provider[]>(queries.allProviders);
			setProviders(providers);
		}
		fetchProviders();
	}, []);
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

	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				variant="secondary"
				className="h-8 w-8 bg-transparent p-0 text-muted-foreground sm:w-48 sm:justify-start sm:bg-accent sm:px-3 sm:py-2 hover:text-primary"
			>
				<LucideSearch className="size-4" />
				<span className="hidden sm:block">Search</span>
				<kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium font-mono text-muted-foreground text-xs opacity-100 sm:inline-flex">
					<span className="text-xs">⌘</span>K
				</kbd>
			</Button>
			<CommandDialog
				paginated
				onKeyDown={(e) => {
					if (e.key === "Escape" || (e.key === "Backspace" && !search)) {
						e.preventDefault();
						setPages((pages) => pages.slice(0, -1));
					}
				}}
				open={open}
				onOpenChange={setOpen}
			>
				<CommandInput
					value={search}
					onValueChange={setSearch}
					placeholder="Type a command or search..."
				/>
				<CommandList className="h-[var(--cmdk-list-height)] transition-[height] duration-300 ease-in-out">
					<CommandEmpty>No results found.</CommandEmpty>
					{!page && (
						<>
							<CommandGroup>
								<CommandItem onSelect={() => setPages([...pages, "providers"])}>
									<LucideGrid2X2 className="size-4" />
									Search Providers
									<CommandShortcut>SP</CommandShortcut>
								</CommandItem>
								<CommandItem
									onSelect={() => {
										window.open(requestUrl, "_blank");
									}}
								>
									<GithubIcon className="size-4" />
									Request Provider
									<CommandShortcut>RP</CommandShortcut>
								</CommandItem>
							</CommandGroup>
							<CommandGroup heading="Theme">
								<CommandItem onSelect={() => setTheme("light")}>
									<LucideSun className="size-4" />
									Light Theme
								</CommandItem>
								<CommandItem onSelect={() => setTheme("dark")}>
									<LucideMoon className="size-4" />
									Dark Theme
								</CommandItem>
								<CommandItem onSelect={() => setTheme("system")}>
									<LucideMonitor className="size-4" />
									System Theme
								</CommandItem>
							</CommandGroup>
						</>
					)}
					{page === "providers" && (
						<CommandGroup heading="Providers">
							{providers.map((provider) => (
								<CommandItem
									onSelect={() => {
										router.push(`/providers/${provider.id}`);
										setOpen(false);
									}}
									key={provider.id}
									value={provider.name}
									className="gap-3"
								>
									<img
										src={provider.icon}
										alt={`${provider.name} logo`}
										className="h-8 min-w-8 max-w-10"
									/>
									<div>
										<p>{provider.name}</p>
										<span className="line-clamp-1 text-muted-foreground text-sm">
											{provider.description}
										</span>
									</div>
								</CommandItem>
							))}
						</CommandGroup>
					)}
				</CommandList>
				<div className="flex h-[40px] w-full items-center justify-between border-t bg-background p-3">
					<Image
						alt="Deploys.top logo"
						src="/deploys-top.png"
						width={24}
						height={24}
						loading="eager"
					/>
					<div className="flex items-center gap-1">
						<Button
							onClick={() => setOpen(false)}
							size="sm"
							className="h-7 text-xs"
							variant="secondary"
						>
							Close
							<kbd className="">Esc</kbd>
						</Button>
						<Button size="sm" className="h-7 text-xs" variant="secondary">
							Navigate
							<kbd>↑</kbd>
							<kbd>↓</kbd>
						</Button>
						<Button size="sm" className="h-7 text-xs" variant="secondary">
							Select
							<kbd>↵</kbd>
						</Button>
					</div>
				</div>
			</CommandDialog>
		</>
	);
}
