import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import type { Category } from "@/types/category";
import type { Provider } from "@/types/provider";

import {
	LucideCheck,
	LucideCircleDollarSign,
	LucideFilter,
} from "lucide-react";
import { LucideIcon } from "@/lib/lucide-icon";
import { useState } from "react";

interface FilterPopoverProps {
	isFiltering: boolean;
	categories: Category[];
	providers: Provider[];
	query: string;
	category: string[];
	freeProviders: boolean;
	handleCategoryChange: (
		id: string,
		action: { type: "add" | "remove" },
	) => void;
	handleFreeProvidersChange: (value: boolean | undefined) => void;
	handleResetFilters: () => void;
}

interface CheckboxProps {
	isSelected: boolean;
	children: React.ReactNode;
}

const FilterCheckbox = ({ isSelected }: { isSelected: boolean }) => (
	<div
		className={cn(
			"mr-2 flex h-4 w-4 items-center justify-center rounded-lg border border-primary",
			isSelected
				? "bg-primary text-primary-foreground"
				: "opacity-50 [&_svg]:hidden",
		)}
	>
		<LucideCheck className={cn("fade-in-0 zoom-in-50 h-4 w-4 animate-in")} />
	</div>
);

const FilterButton = ({ isFiltering }: { isFiltering: boolean }) => (
	<Button
		aria-label="Toggle filters"
		variant="outline"
		size="sm"
		className={cn(
			!isFiltering && "col-span-2",
			"ml-auto h-8 bg-background sm:w-max",
		)}
	>
		<LucideFilter className="size-4" />
		<span className="hidden sm:inline">Filter</span>
	</Button>
);

const FreeTierFilter = ({
	freeProviders,
	providers,
	handleFreeProvidersChange,
}: Pick<
	FilterPopoverProps,
	"freeProviders" | "providers" | "handleFreeProvidersChange"
>) => (
	<CommandItem onSelect={() => handleFreeProvidersChange(freeProviders)}>
		<FilterCheckbox isSelected={freeProviders} />
		<LucideCircleDollarSign className="size-5" />
		Free tier
		<span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
			{providers.filter((p) => p.has_free_tier).length}
		</span>
	</CommandItem>
);

const CategoryFilter = ({
	cat,
	isSelected,
	providers,
	handleCategoryChange,
}: {
	cat: Category;
	isSelected: boolean;
	providers: Provider[];
	handleCategoryChange: FilterPopoverProps["handleCategoryChange"];
}) => (
	<CommandItem
		key={cat.id}
		onSelect={() => {
			handleCategoryChange(cat.id, {
				type: isSelected ? "remove" : "add",
			});
		}}
	>
		<FilterCheckbox isSelected={isSelected} />
		<LucideIcon name={cat.icon} className="size-5" />
		{cat.name}
		<span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
			{
				providers
					.flatMap((provider) => provider.categories)
					.filter((c) => c.id === cat.id).length
			}
		</span>
	</CommandItem>
);

export function FilterPopover({
	isFiltering,
	categories,
	providers,
	query,
	category,
	freeProviders,
	handleCategoryChange,
	handleFreeProvidersChange,
	handleResetFilters,
}: FilterPopoverProps) {
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger>
				<FilterButton isFiltering={isFiltering} />
			</PopoverTrigger>
			<PopoverContent className="z-40 ml-2 w-[250px] p-0" align="end">
				<Command>
					<CommandInput placeholder="Filter providers by:" />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup heading="Category">
							<FreeTierFilter
								freeProviders={freeProviders}
								providers={providers}
								handleFreeProvidersChange={handleFreeProvidersChange}
							/>
							{categories.map((cat) => (
								<CategoryFilter
									key={cat.id}
									cat={cat}
									isSelected={category.includes(cat.id)}
									providers={providers}
									handleCategoryChange={handleCategoryChange}
								/>
							))}
						</CommandGroup>
						{isFiltering && (
							<div className="sticky bottom-0 bg-background">
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={handleResetFilters}
										className="justify-center text-center"
									>
										Clear filters
									</CommandItem>
								</CommandGroup>
							</div>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
