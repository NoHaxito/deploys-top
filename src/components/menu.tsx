import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { queries } from "@/lib/groq-queries";
import { LucideIcon } from "@/lib/lucide-icon";
import { cn } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import type { Provider } from "@/types/provider";
import { LucideDollarSign, LucideLayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { Button, buttonVariants } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function DesktopMenu() {
	const [providers, setProviders] = React.useState<Provider[]>([]);
	const [categories, setCategories] = React.useState<
		{ name: string; id: string; icon: string }[]
	>([]);
	useEffect(() => {
		async function getCategories() {
			const cs = await client.fetch<
				{ name: string; id: string; icon: string }[]
			>(queries.allCategories);
			return cs;
		}
		async function getFreeProviders() {
			const ps = await client.fetch<Provider[]>(queries.freeProviders);
			return ps;
		}
		getFreeProviders().then((data) => setProviders(data));
		getCategories().then((data) => setCategories(data));
	}, []);

	const pathname = usePathname();
	const first_6_free_providers = providers.slice(0, 6);
	return (
		<NavigationMenu className="hidden md:flex">
			<NavigationMenuList>
				<NavigationMenuItem value="free-providers">
					<NavigationMenuTrigger className="h-8 bg-transparent">
						Free Providers
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid h-64 w-[400px] grid-cols-1 gap-1 overflow-y-auto p-4 lg:h-max lg:w-[500px] lg:grid-cols-2">
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
							<div className="-bottom-3.5 sticky col-span-full flex items-center justify-center bg-background">
								<Link
									className={cn(
										buttonVariants({ variant: "link" }),
										"text-center",
									)}
									href="/providers?freeProviders=true"
								>
									See all free providers ({providers.length})
								</Link>
							</div>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem value="categories">
					<NavigationMenuTrigger className="h-8 bg-transparent">
						Categories
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid h-64 w-[400px] grid-cols-2 gap-1 overflow-auto p-4 lg:h-max">
							{categories.map(({ id, name, icon }) => (
								<ListItem
									key={id}
									categoryIcon={icon}
									href={`/providers?category=${id}`}
									title={name}
								/>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				{/* <NavigationMenuItem className="pointer-events-none opacity-50">
          <Link href="/compare" legacyBehavior passHref>
            <NavigationMenuLink
              active={pathname === "/compare"}
              className={navigationMenuTriggerStyle({
                className: "h-8 bg-transparent",
              })}
            >
              Compare providers (Soon)
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
export function MobileMenu() {
	const [providers, setProviders] = React.useState<Provider[]>([]);
	const [categories, setCategories] = React.useState<
		{ name: string; id: string; icon: string }[]
	>([]);
	useEffect(() => {
		async function getCategories() {
			const cs = await client.fetch<
				{ name: string; id: string; icon: string }[]
			>(queries.allCategories);
			return cs;
		}
		async function getFreeProviders() {
			const ps = await client.fetch<Provider[]>(queries.freeProviders);
			return ps;
		}
		getFreeProviders().then((data) => setProviders(data));
		getCategories().then((data) => setCategories(data));
	}, []);
	const first_4_categories = categories.slice(0, 4);
	const first_6_free_providers = providers.slice(0, 6);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="group flex h-8 w-8 overflow-hidden whitespace-nowrap md:hidden sm:w-max data-[state=open]:bg-muted"
				>
					<div className="group relative flex flex-col gap-1">
						<div className="h-px w-4 rounded-lg bg-foreground transition-transform duration-300 ease-in-out group-data-[state=open]:translate-y-0.5 group-data-[state=open]:rotate-[45deg]" />
						<div className="group-data-[state=open]:-translate-y-[2.8px] group-data-[state=open]:-rotate-[45deg] h-px w-4 rounded-lg bg-foreground transition-transform duration-300 ease-in-out" />
					</div>
					<span className="sr-only">Toggle menu</span>
					<p className="hidden sm:block after:content-['Open_Menu'] group-data-[state=open]:after:content-['Close_Menu']" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="mr-1 sm:min-w-40">
				<DropdownMenuSub>
					<DropdownMenuSubTrigger
						icon={<LucideDollarSign className="size-4" />}
					>
						Free Providers
					</DropdownMenuSubTrigger>
					<DropdownMenuSubContent className="mr-1 max-w-44 sm:min-w-40">
						{first_6_free_providers.map((provider) => (
							<DropdownMenuItem asChild key={provider.id} icon={provider.icon}>
								<Link href={`/providers/${provider.id}`}>
									<span className="line-clamp-1">{provider.name}</span>
								</Link>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild className="text-xs">
							<Link href="/providers?freeProviders=true">
								See all free providers ({providers.length})
							</Link>
						</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuSub>
					<DropdownMenuSubTrigger
						icon={<LucideLayoutGrid className="size-4" />}
					>
						Categories
					</DropdownMenuSubTrigger>
					<DropdownMenuSubContent alignOffset={-4} className="mr-1 sm:min-w-40">
						{first_4_categories.map(({ name, id, icon }) => (
							<DropdownMenuItem
								asChild
								key={id}
								icon={
									<LucideIcon name={icon} className="size-5 min-h-5 min-w-5" />
								}
							>
								<Link href={`/providers?category=${id}`}>{name}</Link>
							</DropdownMenuItem>
						))}
					</DropdownMenuSubContent>
				</DropdownMenuSub>

				{/* <DropdownMenuItem
          disabled
          asChild
          icon={<LucideGitCompareArrows className="size-4" />}
        >
          <Link href="/compare">Compare (Soon)</Link>
        </DropdownMenuItem> */}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a"> & {
		providerIcon?: string; // because its a image (url)
		categoryIcon?: string; // name of the icon from lucide.dev
	}
>(
	(
		{ className, title, children, providerIcon, categoryIcon, href, ...props },
		ref,
	) => {
		const pathname = usePathname();
		return (
			<li>
				<NavigationMenuLink asChild active={href === pathname}>
					<Link
						ref={ref}
						className={cn(
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
							{categoryIcon && (
								<LucideIcon
									name={categoryIcon}
									className="size-5 min-h-5 min-w-5"
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
				</NavigationMenuLink>
			</li>
		);
	},
);
ListItem.displayName = "ListItem";
