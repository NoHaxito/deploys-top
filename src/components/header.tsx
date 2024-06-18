import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "./icons/github";
import { DesktopMenu, MobileMenu } from "./menu";
import { ThemeToggle } from "./theme-toggle";
import { Button, buttonVariants } from "./ui/button";
import { SearchMenu } from "./search-menu";

export function Header() {
	return (
		<header className="sticky top-2 z-50 w-full transition-colors">
			<div className="container flex h-16 max-w-screen-lg items-center">
				<div className="slide-in-from-top-10 flex h-12 w-full animate-in items-center rounded-lg border bg-background p-2 duration-500">
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
					<DesktopMenu />
					<div className="flex flex-1 items-center justify-end space-x-1">
						<SearchMenu />
						<Button disabled variant="outline" className="h-8" size="sm">
							Sign In
						</Button>
						{/* <MobileMenu /> */}
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
			</div>
		</header>
	);
}
