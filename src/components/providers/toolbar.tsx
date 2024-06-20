"use client";

import type { Category } from "@/types/category";
import type { Provider } from "@/types/provider";
import { LucideFilterX, LucideLoader2, LucideSearch } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";

import { Input } from "../ui/input";
import { FilterPopover } from "./filter-popover";

export interface Filter {
	query?: string;
	category?: string[];
	freeProviders?: boolean;
}

export function ProviderToolbar({
	providers,
	filter,
	setFilter,
}: {
	providers: Provider[];
	filter: Filter | null;
	setFilter: (filter: Filter | null) => void;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const categories = providers.flatMap((provider) =>
		provider.categories.map((category) => category),
	); // refactor to receive via props
	const isFiltering =
		filter !== null &&
		(filter.query !== "" ||
			(filter.category && filter.category?.length > 0) ||
			filter.freeProviders);
	const uniqueCategories: Category[] = Array.from(
		new Set(categories.map((category) => JSON.stringify(category))),
	).map((category) => JSON.parse(category));
	const [isPending, startTransition] = useTransition();

	const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const params = new URLSearchParams(window.location.search);
		const queryValue = e.currentTarget.value;
		setTimeout(() => {
			setFilter({ ...filter, query: queryValue });
		}, 1000);
		if (e.currentTarget.value === "") {
			params.delete("query");
		} else {
			params.set("query", queryValue);
		}
		startTransition(() => {
			router.replace(`${pathname}?${params.toString()}`);
		});
	};
	const handleFreeProvidersChange = (isSelected?: boolean) => {
		const params = new URLSearchParams(window.location.search);
		if (!isSelected) {
			setFilter({ ...filter, freeProviders: true });
			params.set("freeProviders", "true");
		} else {
			setFilter({ ...filter, freeProviders: false });
			params.delete("freeProviders");
		}
		startTransition(() => {
			router.replace(`${pathname}?${params.toString()}`);
		});
	};
	const handleCategoryChange = (
		category: string,
		options?: { type: "add" | "remove" },
	) => {
		const params = new URLSearchParams(window.location.search);
		const categoryValue = category;
		if (options?.type === "add") {
			setFilter({
				...filter,
				category: [...(filter?.category || []), category],
				query: filter?.query || "",
			});
			params.append("category", categoryValue);
		} else if (options?.type === "remove") {
			setFilter({
				...filter,
				category: filter?.category?.filter((c) => c !== category) || [],
				query: filter?.query || "",
			});
			params.delete("category", categoryValue);
		}
		startTransition(() => {
			router.replace(`${pathname}?${params.toString()}`);
		});
	};
	const handleResetFilters = () => {
		setFilter({ query: "", category: [], freeProviders: false });
		const params = new URLSearchParams(window.location.search);
		params.delete("query");
		params.delete("category");
		params.delete("freeProviders");
		startTransition(() => {
			router.replace(`${pathname}?${params.toString()}`);
		});
	};

	return (
		<div className="mb-3 flex gap-1 sm:items-center sm:justify-between sm:gap-2">
			<div className="relative col-span-full flex-1 transition-all">
				<span className="absolute inset-y-0 left-2 flex items-center justify-center">
					<LucideSearch className="size-4" />
				</span>
				<Input
					defaultValue={filter?.query}
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
					filter={filter}
					handleCategoryChange={handleCategoryChange}
					handleResetFilters={handleResetFilters}
					handleFreeProvidersChange={handleFreeProvidersChange}
				/>
			</div>
		</div>
	);
}
