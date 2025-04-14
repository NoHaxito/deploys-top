"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "./icons/github";
import { DesktopMenu } from "./menu";
import { ThemeToggle } from "./theme-toggle";
import { Button, buttonVariants } from "./ui/button";
import { SearchMenu } from "./search-menu";
import { useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import type { Session, User } from "lucia";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LucideLogOut, LucideUser } from "lucide-react";
import { logout } from "@/app/auth/actions";
import { usePathname } from "next/navigation";

interface HeaderProps {
	session: Session | null;
	user: User | null;
}

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

const NavButton = ({ open }: { open: boolean }) => (
	<NavigationMenu.Trigger asChild>
		<Button
			size="sm"
			variant="ghost"
			className={cn(
				open && "bg-accent",
				"hidden h-8 md:flex",
				"transition-colors duration-200 hover:bg-accent/80",
			)}
		>
			Free Providers
		</Button>
	</NavigationMenu.Trigger>
);

const UserProfile = ({ user, pathname }: { user: User; pathname: string }) => (
	<DropdownMenu>
		<DropdownMenuTrigger className="focus:outline-hidden focus:ring-2 focus:ring-primary">
			<div className="relative">
				<img
					src={user.avatar_url}
					alt={`${user.username}'s avatar`}
					className="size-8 rounded-full ring-2 ring-background transition-transform hover:scale-105"
				/>
				<div className="absolute -bottom-1 -right-1 size-3 rounded-full border-2 border-background bg-green-500" />
			</div>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end" className="w-48">
			<div className="px-2 py-1.5">
				<p className="text-sm font-medium">{user.username}</p>
				<p className="text-xs text-muted-foreground">Signed in</p>
			</div>
			<DropdownMenuSeparator />
			<DropdownMenuItem asChild>
				<Link href="/profile" className="flex items-center">
					<LucideUser className="mr-2 size-4" />
					Profile
				</Link>
			</DropdownMenuItem>
			<DropdownMenuItem
				className="text-red-600 focus:text-red-600"
				onSelect={async () => {
					await logout(pathname);
				}}
			>
				<LucideLogOut className="mr-2 size-4" />
				Sign Out
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
);

const AuthSection = ({
	session,
	user,
	pathname,
}: HeaderProps & { pathname: string }) => (
	<div className="flex items-center gap-2">
		{!session ? (
			<Button
				variant="outline"
				className="h-8 transition-colors duration-200 hover:bg-accent"
				size="sm"
				asChild
			>
				<Link href={`/auth/github?next=${pathname}`}>
					<GithubIcon className="size-4" />
					Sign In
				</Link>
			</Button>
		) : (
			user && <UserProfile user={user} pathname={pathname} />
		)}
	</div>
);

const HeaderActions = () => (
	<div className="flex items-center gap-2">
		<ThemeToggle />
		<Link
			href="https://github.com/nohaxito/deploys-top"
			target="_blank"
			rel="noopener noreferrer"
			className={cn(
				buttonVariants({ variant: "ghost", size: "icon" }),
				"size-8 transition-colors duration-200 hover:bg-accent",
			)}
			aria-label="View on GitHub"
		>
			<GithubIcon className="size-4" />
		</Link>
	</div>
);

export function Header({ session, user }: HeaderProps) {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	return (
		<header className="fixed top-4 z-50 w-full transition-colors">
			<NavigationMenu.Root
				className="relative"
				defaultValue="free-providers"
				onValueChange={(value) => setOpen(value !== "")}
			>
				<NavigationMenu.List className="container flex max-w-(--breakpoint-lg) items-center">
					<NavigationMenu.Item value="free-providers" className="w-full">
						<div className="flex w-full items-center">
							<div
								className={cn(
									"h-12 w-full rounded-xl border bg-background/95 backdrop-blur-lg transition-all duration-300",
									// open ? "h-96" : "h-12",
								)}
							>
								<div
									className={cn(
										"flex w-full items-center p-2",
										open && "border-b",
									)}
								>
									<div className="mr-2 flex items-center">
										<Logo />
										<NavButton open={open} />
									</div>

									<div className="flex flex-1 items-center justify-end space-x-2">
										<SearchMenu />
										<AuthSection
											session={session}
											user={user}
											pathname={pathname}
										/>
										<HeaderActions />
									</div>
								</div>
							</div>
						</div>
						<DesktopMenu />
					</NavigationMenu.Item>
				</NavigationMenu.List>
			</NavigationMenu.Root>
		</header>
	);
}
