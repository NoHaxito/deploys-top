"use client";

import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer";
import { cn, isAwsProvider } from "@/lib/utils";
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
import { ProviderBottomBar } from "./providers/provider-bottom-bar";
import type { User } from "lucia";
import type { VoteTable } from "@/db";
import { useMemo, useTransition } from "react";
import { vote } from "@/app/providers/[provider]/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

export function ProviderHeader({
	provider,
	user,
	votes,
}: { provider: Provider; user: User | null; votes: VoteTable[] }) {
	const { isIntersecting, ref } = useIntersectionObserver({
		threshold: 0.5,
		initialIsIntersecting: true,
	});
	const router = useRouter();
	const [upvotePending, startUpvoteTransition] = useTransition();
	const [downvotePending, startDownvoteTransition] = useTransition();
	const { downvotes, upvotes, userVote } = useMemo(() => {
		const upvotes = votes.filter((vote) => vote.vote_type === "upvote").length;
		const downvotes = votes.filter(
			(vote) => vote.vote_type === "downvote",
		).length;
		const userVote = votes.find((vote) => vote.user_id === user?.id)?.vote_type;
		return { upvotes, downvotes, userVote };
	}, [votes]);

	return (
		<>
			<div
				ref={ref}
				className="fade-in-0 slide-in-from-bottom-2 relative flex h-[18rem] w-full animate-in flex-col items-center justify-center duration-300"
			>
				<img
					alt={`${provider.name} logo`}
					src={provider.icon}
					className={cn(
						isAwsProvider(provider.name) && "dark:aws-logo",
						"size-24",
					)}
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
							disabled={!user || upvotePending || downvotePending}
							variant="secondary"
							onClick={async () => {
								startUpvoteTransition(async () => {
									if (!user?.id) return;
									await vote(provider.id, user.id, "upvote", userVote);
									toast.success("Your vote has been recorded.");
									router.refresh();
								});
							}}
							className="group h-8 rounded-none text-muted-foreground hover:text-primary"
						>
							<LucideThumbsUp
								className={cn(
									userVote === "upvote" && "fill-current",
									"size-4 text-primary",
								)}
							/>
							{formatQuantity(upvotes)}
						</Button>
						<Separator orientation="vertical" className="dark:bg-neutral-700" />
						<Button
							disabled={!user || upvotePending || downvotePending}
							variant="secondary"
							onClick={async () => {
								startDownvoteTransition(async () => {
									if (!user?.id) return;
									await vote(provider.id, user.id, "downvote", userVote);
									toast.success("Your vote has been recorded.");
									router.refresh();
								});
							}}
							className="group h-8 rounded-none text-muted-foreground hover:text-primary"
						>
							<LucideThumbsDown
								className={cn(
									userVote === "downvote" && "fill-current",
									"size-4 text-primary",
								)}
							/>
							{formatQuantity(downvotes)}
						</Button>
					</div>
				</div>
			</div>

			<ProviderBottomBar provider={provider} show={isIntersecting} />
		</>
	);
}
