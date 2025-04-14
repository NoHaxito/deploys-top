"use client";

import type { Provider } from "@/types/provider";
import { LucideSearchX } from "lucide-react";
import { useMemo } from "react";
import { ProviderCard } from "./provider-card";
import { ProviderToolbar } from "./toolbar";
import { AnimatedGroup } from "../ui/animated-group";
import {
	parseAsArrayOf,
	parseAsBoolean,
	parseAsString,
	useQueryStates,
} from "nuqs";

export function ProviderList({ providers }: { providers: Provider[] }) {
	const [{ query, category, freeProviders }] = useQueryStates({
		query: parseAsString.withDefault(""),
		category: parseAsArrayOf(parseAsString).withDefault([]),
		freeProviders: parseAsBoolean.withDefault(false),
	});

	const filteredProviders = useMemo(() => {
		return providers.filter((provider) => {
			const categoryFilterPassed =
				category.length === 0 ||
				category.every((categoryId) => {
					return provider.categories.some((c) => c.id === categoryId);
				});
			const freeProviderFilterPassed = !freeProviders || provider.has_free_tier;
			const queryFilterPassed =
				!query || provider.name.toLowerCase().includes(query.toLowerCase());

			return (
				categoryFilterPassed && queryFilterPassed && freeProviderFilterPassed
			);
		});
	}, [providers, query, category, freeProviders]);

	return (
		<>
			{providers.length !== 0 ? (
				<>
					<ProviderToolbar providers={providers} />
					{filteredProviders.length !== 0 ? (
						<AnimatedGroup
							variants={{
								container: {
									hidden: { opacity: 0 },
									visible: {
										opacity: 1,
										transition: {
											staggerChildren: 0.05,
										},
									},
								},
								item: {
									hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
									visible: {
										opacity: 1,
										y: 0,
										filter: "blur(0px)",
										transition: {
											duration: 1.2,
											type: "spring",
											bounce: 0.3,
										},
									},
								},
							}}
							className="grid auto-rows-fr grid-cols-2 gap-3 lg:grid-cols-3"
						>
							{filteredProviders.map((provider) => (
								<ProviderCard key={provider.id} provider={provider} />
							))}
						</AnimatedGroup>
					) : (
						<div className="flex h-[60vh] flex-col items-center justify-center">
							<LucideSearchX className="size-16" />
							<p className="font-bold text-2xl">No results</p>
							<span className="text-muted-foreground">
								Try with another search parameter or filter.
							</span>
						</div>
					)}
				</>
			) : (
				<>No providers found {/* Add a UI State for this. */}</>
			)}
		</>
	);
}
