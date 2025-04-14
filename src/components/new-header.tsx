"use client";

import { cn } from "@/lib/utils";
import type { Provider } from "@/types/provider";
import Image from "next/image";
import Link from "next/link";
import { type HTMLAttributes, useEffect, useState } from "react";
import { DesktopMenu } from "./menu";
import { SearchMenu } from "./search-menu";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
} from "./ui/custom-navigation-menu";

import { getRandomMostVotedProvider } from "@/actions/get-random-most-voted-provider";
import { queries } from "@/lib/groq-queries";
import { client } from "@/sanity/lib/client";
import { GithubIcon } from "./icons/github";
import { ThemeToggle } from "./theme-toggle";
import { buttonVariants } from "./ui/button";

const Logo = () => (
	<Link
		href="/"
		className="group mr-6 flex items-center space-x-2 transition-opacity hover:opacity-90"
		aria-label="Deploys.top Home"
	>
		<Image
			alt="Deploys.top logo"
			src="/deploys-top.png"
			width={32}
			height={32}
			loading="eager"
			className="transition-transform duration-200 group-hover:scale-105"
		/>
		<span className="font-bold text-black dark:text-white">Deploys.top</span>
	</Link>
);

const HeaderActions = () => (
	<div className="flex items-center gap-1">
		<ThemeToggle />
		<Link
			href="https://github.com/nohaxito/deploys-top"
			target="_blank"
			rel="noopener noreferrer"
			className={cn(
				buttonVariants({ variant: "outline", size: "icon" }),
				"size-8 bg-accent/50 hover:bg-accent/90",
			)}
			aria-label="View on GitHub"
		>
			<GithubIcon className="size-4" />
		</Link>
	</div>
);

export function Navbar(props: HTMLAttributes<HTMLElement>) {
	const [value, setValue] = useState("");
	const [providers, setProviders] = useState<Provider[]>([]);
	const [mostVoted, setMostVoted] = useState<Provider | null>(null);
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
	return (
		<NavigationMenu value={value} onValueChange={setValue} asChild>
			<header
				id="nd-nav"
				{...props}
				className={cn(
					"-translate-x-1/2 fixed top-0 left-1/2 z-40 box-content w-full max-w-(--breakpoint-lg) border-foreground/10 border-b transition-colors lg:mt-2 lg:w-[calc(100%-1rem)] lg:rounded-2xl lg:border",
					value.length > 0 ? "shadow-lg" : "shadow-sm",
					"bg-background/80 backdrop-blur-lg",
					props.className,
				)}
			>
				<NavigationMenuList
					className="flex h-14 w-full flex-row items-center px-4 lg:h-12"
					asChild
				>
					<nav>
						<Logo />
						<ul className="flex flex-row items-center gap-2 px-6 max-sm:hidden">
							<NavigationMenuItem>
								<NavigationMenuTrigger className="flex h-8 items-center justify-center rounded-lg px-3 py-2 text-sm hover:bg-accent/90">
									Free Providers
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<DesktopMenu mostVoted={mostVoted} providers={providers} />
								</NavigationMenuContent>
							</NavigationMenuItem>
						</ul>
						<div className="flex flex-1 flex-row items-center justify-end gap-1">
							<SearchMenu />
							<HeaderActions />
						</div>
					</nav>
				</NavigationMenuList>
				<NavigationMenuViewport />
			</header>
		</NavigationMenu>
	);
}
