"use client";

import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import type { Provider } from "@/types/provider";
import {
	LucideArrowUpRight,
	LucideChevronLeft,
	LucideDollarSign,
	LucideGlobe,
	LucideThumbsDown,
	LucideThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";

function formatQuantity(value: number) {
	if (value < 1000) return value.toString();
	const suffixes = ["", "K", "M", "B", "T"];
	const suffixNum = Math.floor(`${value}`.length / 3);
	let shortValue = Number.parseFloat(
		(suffixNum !== 0 ? value / 1000 ** suffixNum : value).toPrecision(2),
	);
	if (shortValue % 1 !== 0) {
		shortValue = Number.parseFloat(shortValue.toFixed(1));
	}
	return shortValue + suffixes[suffixNum];
}

export function ProviderHeader({ provider }: { provider: Provider }) {
	const { isIntersecting, ref } = useIntersectionObserver({
		threshold: 0.5,
		initialIsIntersecting: true,
	});
	return (
		<>
			<div
				ref={ref}
				className="fade-in-0 slide-in-from-bottom-2 relative flex h-[18rem] w-full animate-in flex-col items-center justify-center duration-300"
			>
				<img
					alt={`${provider.name} logo`}
					src={provider.icon}
					className="size-16 mix-blend-normal"
				/>
				<h1 className="mt-2 font-bold text-lg tracking-tight md:text-3xl">
					{provider.name}
				</h1>
				<p className="line-clamp-2 max-w-96 text-center text-muted-foreground text-sm sm:text-lg">
					{provider.description}
				</p>
				<div className="-top-1 inset-x-0 mt-4 gap-2 md:absolute md:mt-0 md:flex md:items-center md:justify-between">
					<Button
						className="hidden h-8 rounded-full md:flex"
						asChild
						variant="secondary"
					>
						<Link href={"/providers"}>
							<LucideChevronLeft className="size-4" />
							Back to providers
						</Link>
					</Button>
					<div className="flex items-center justify-between gap-2">
						<Button
							className="group h-8"
							asChild
							Icon={LucideArrowUpRight}
							iconPlacement="right"
						>
							<Link href={provider.href} target="_blank">
								<LucideGlobe className="size-4" />
								Website
							</Link>
						</Button>
						<Button
							variant="outline"
							className="group h-8"
							asChild
							Icon={LucideArrowUpRight}
							iconPlacement="right"
						>
							<Link href={provider.pricing_href} target="_blank">
								<LucideDollarSign className="size-4" />
								Pricing
							</Link>
						</Button>
					</div>
				</div>
				<div className="-bottom-3 inset-x-0 right-0 left-0 mt-6 gap-2 md:absolute md:mt-0 md:flex md:items-center md:justify-center">
					<div className="flex items-center overflow-hidden rounded-lg">
						<Button
							disabled
							variant="secondary"
							className="group h-8 rounded-none text-muted-foreground hover:text-primary"
						>
							<LucideThumbsUp
								// fill="currentColor"
								className="size-4 text-primary"
							/>
							{formatQuantity(0)}
						</Button>
						<Separator orientation="vertical" className="dark:bg-neutral-700" />
						<Button
							disabled
							variant="secondary"
							className="group h-8 rounded-none text-muted-foreground hover:text-primary"
						>
							<LucideThumbsDown className="size-4 text-primary" />
							{formatQuantity(0)}
						</Button>
					</div>
				</div>
			</div>

			<div
				className={cn(
					!isIntersecting ? "z-50 translate-y-0" : "-z-50 translate-y-[200%]",
					"container fixed inset-x-0 bottom-4 w-full max-w-screen-lg transition-all duration-500",
				)}
			>
				<div className="flex h-14 w-full items-center justify-between gap-2 rounded-lg border bg-background p-2 shadow-lg">
					<div className="flex items-center gap-2">
						<Button
							className="size-8 rounded-full"
							variant="secondary"
							size="icon"
							onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						>
							<LucideChevronLeft className="size-4 min-w-4 rotate-90" />
							<span className="sr-only">Scroll to top</span>
						</Button>
						<img
							alt={`${provider.name} logo}`}
							src={provider.icon}
							className="size-8 sm:size-10"
						/>
						<p className="line-clamp-1 font-bold text-sm">{provider.name}</p>
					</div>
					<div className="flex items-center justify-between gap-2">
						<Button
							className="group h-8 w-8 p-0 md:w-fit md:px-4 md:py-2"
							asChild
						>
							<Link href={provider.href} target="_blank">
								<LucideGlobe className="size-4" />
								<span className="hidden md:block">Website</span>
							</Link>
						</Button>
						<Button
							variant="outline"
							className="group h-8 w-8 p-0 md:w-fit md:px-4 md:py-2"
							asChild
						>
							<Link href={provider.pricing_href} target="_blank">
								<LucideDollarSign className="size-4" />
								<span className="hidden md:block">Pricing</span>
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
