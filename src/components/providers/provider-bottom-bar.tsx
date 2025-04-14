import { cn } from "@/lib/utils";
import type { Provider } from "@/types/provider";
import { Button } from "../ui/button";
import { LucideChevronLeft, LucideDollarSign, LucideGlobe } from "lucide-react";
import Link from "next/link";

export function ProviderBottomBar({
	show,
	provider,
}: { show: boolean; provider: Provider }) {
	return (
		<div
			className={cn(
				!show ? "z-50 translate-y-0" : "-z-50 translate-y-[200%]",
				"container fixed inset-x-0 bottom-4 w-full max-w-(--breakpoint-sm) transition-all duration-500",
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
	);
}
