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
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LucideLogOut } from "lucide-react";
import { logout } from "@/app/auth/actions";
import { usePathname } from "next/navigation";

export function Header({
	session,
	user,
}: {
	session: Session | null;
	user: User | null;
}) {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	return (
		<header className="fixed top-4 z-50 w-full transition-colors">
			<NavigationMenu.Root
				asChild
				defaultValue="free-providers"
				onValueChange={(value) => setOpen(value !== "")}
			>
				<NavigationMenu.List asChild>
					<NavigationMenu.Item asChild value="free-providers">
						<div className="container flex max-w-screen-lg items-center">
							<div
								className={cn(
									open ? "h-96" : "h-12",
									"slide-in-from-top-10 flex w-full animate-in flex-col gap-y-2 overflow-hidden rounded-xl border bg-background/80 backdrop-blur-lg transition-[height] duration-500",
								)}
							>
								<div
									className={cn(
										open && "border-b",
										"flex w-full items-center p-2",
									)}
								>
									<div className="mr-2">
										<Link href="/" className="mr-6 flex items-center space-x-2">
											<Image
												alt="Deploys.top logo"
												src="/deploys-top.png"
												width={32}
												height={32}
												loading="eager"
											/>
											<span className="font-bold text-black dark:text-white">
												Deploys.top
											</span>
										</Link>
									</div>
									<NavigationMenu.Trigger asChild>
										<Button
											size="sm"
											variant="ghost"
											className={cn(open && "bg-accent", "hidden h-8 md:flex")}
										>
											Free Providers
										</Button>
									</NavigationMenu.Trigger>
									<div className="flex flex-1 items-center justify-end space-x-1">
										<SearchMenu />
										{!session ? (
											<Button
												variant="outline"
												className="h-8"
												size="sm"
												asChild
											>
												<Link href={`/auth/github?next=${pathname}`}>
													Sign In
												</Link>
											</Button>
										) : (
											<DropdownMenu>
												<DropdownMenuTrigger>
													<img
														src={user?.avatar_url}
														alt="profile pic"
														className="size-8 rounded-full"
													/>
												</DropdownMenuTrigger>
												<DropdownMenuContent>
													<DropdownMenuItem
														onSelect={async () => {
															await logout(pathname);
														}}
													>
														<LucideLogOut className="size-4" />
														Sign Out
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										)}

										<ThemeToggle />
										<Link
											href="https://github.com/nohaxito/deploys-top"
											target="_blank"
											rel="noopener noreferrer"
											className={cn(
												buttonVariants({ variant: "ghost", size: "icon" }),
												"size-8",
											)}
										>
											<GithubIcon className="size-4" />
										</Link>
									</div>
								</div>
								<DesktopMenu />
							</div>
						</div>
					</NavigationMenu.Item>
				</NavigationMenu.List>
			</NavigationMenu.Root>
		</header>
	);
}
