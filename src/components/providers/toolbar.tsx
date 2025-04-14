"use client";

import type { Category } from "@/types/category";
import type { Provider } from "@/types/provider";
import { LucideFilterX, LucideLoader2, LucideSearch } from "lucide-react";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FilterPopover } from "./filter-popover";
import {
	parseAsArrayOf,
	parseAsBoolean,
	parseAsString,
	useQueryState,
} from "nuqs";

export interface Filter {
	query: string;
	category: string[];
	freeProviders: boolean;
}

export function ProviderToolbar({
	providers,
}: {
	providers: Provider[];
}) {
	const [isPending, startTransition] = useTransition();
	const [query, setQuery] = useQueryState(
		"query",
		parseAsString.withDefault(""),
	);
	const [category, setCategory] = useQueryState(
		"category",
		parseAsArrayOf(parseAsString).withDefault([]),
	);
	const [freeProviders, setFreeProviders] = useQueryState(
		"freeProviders",
		parseAsBoolean.withDefault(false),
	);

	const categories = providers.flatMap((provider) =>
		provider.categories.map((category) => category),
	);

	const isFiltering = query !== "" || category.length > 0 || freeProviders;

	const uniqueCategories: Category[] = Array.from(
		new Set(categories.map((category) => JSON.stringify(category))),
	).map((category) => JSON.parse(category));

	const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		startTransition(() => {
			setQuery(e.target.value || null);
		});
	};

	const handleFreeProvidersChange = (isSelected?: boolean) => {
		startTransition(() => {
			setFreeProviders(!isSelected);
		});
	};

	const handleCategoryChange = (
		categoryId: string,
		options?: { type: "add" | "remove" },
	) => {
		startTransition(() => {
			if (options?.type === "add") {
				setCategory([...category, categoryId]);
			} else {
				setCategory(category.filter((c) => c !== categoryId));
			}
		});
	};

	const handleResetFilters = () => {
		startTransition(() => {
			setQuery(null);
			setCategory(null);
			setFreeProviders(null);
		});
	};

	return (
		<div className="mb-3 flex gap-1 sm:items-center sm:justify-between sm:gap-2">
			<div className="relative col-span-full flex-1 transition-all">
				<span className="absolute inset-y-0 left-2 flex items-center justify-center">
					<LucideSearch className="size-4" />
				</span>
				<Input
					value={query}
					onChange={handleQueryChange}
					placeholder="Search provider"
					className="h-8 pr-8 pl-8 transition-[width]"
				/>

				{isPending && (
					<span className="absolute inset-y-0 right-2 flex items-center justify-center">
						<LucideLoader2 className="size-4 animate-spin" />
					</span>
				)}
			</div>
			<div className="flex items-center gap-2">
				{isFiltering && (
					<Button
						aria-label="Reset filters"
						variant="outline"
						onClick={handleResetFilters}
						size="sm"
						className="ml-auto h-8 bg-background sm:w-max"
					>
						<LucideFilterX className="size-4" />
						<span className="hidden sm:inline">Reset filters</span>
					</Button>
				)}

				<FilterPopover
					isFiltering={isFiltering}
					categories={uniqueCategories}
					providers={providers}
					query={query}
					category={category}
					freeProviders={freeProviders}
					handleCategoryChange={handleCategoryChange}
					handleResetFilters={handleResetFilters}
					handleFreeProvidersChange={handleFreeProvidersChange}
				/>
			</div>
		</div>
	);
}
