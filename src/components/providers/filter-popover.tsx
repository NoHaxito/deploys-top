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
import type { Filter } from "./toolbar";
import {
	LucideCheck,
	LucideCircleDollarSign,
	LucideFilter,
} from "lucide-react";
import { LucideIcon } from "@/lib/lucide-icon";
import { useState } from "react";
export function FilterPopover({
	filter,
	isFiltering,
	categories,
	providers,
	handleCategoryChange,
	handleFreeProvidersChange,
	handleResetFilters,
}: {
	filter: Filter | null;
	isFiltering: boolean | undefined;
	categories: Category[];
	providers: Provider[];
	handleCategoryChange: (
		id: string,
		action: { type: "add" | "remove" },
	) => void;
	handleFreeProvidersChange: (value: boolean | undefined) => void;
	handleResetFilters: () => void;
}) {
	const [open, setOpen] = useState(false);
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
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
			</PopoverTrigger>
			<PopoverContent className="z-40 ml-2 w-[250px] p-0" align="end">
				<Command>
					<CommandInput placeholder="Filter providers by:" />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						{/* <CommandGroup heading="Frameworks / Application Types">
      <CommandItem>
        <div
          className={cn(
            "mr-2 flex h-4 w-4 items-center justify-center rounded-lg border border-primary transition-all",
            false
              ? "bg-primary text-primary-foreground [&_svg]:scale-100"
              : "opacity-50 [&_svg]:hidden [&_svg]:scale-95"
          )}
        >
          <LucideCheck
            className={cn(
              "fade-in-0 zoom-in-95 h-4 w-4 animate-in"
            )}
          />
        </div>
        Next.js
      </CommandItem>
      <CommandItem>
        <div
          className={cn(
            "mr-2 flex h-4 w-4 items-center justify-center rounded-lg border border-primary transition-all",
            false
              ? "bg-primary text-primary-foreground [&_svg]:scale-100"
              : "opacity-50 [&_svg]:hidden [&_svg]:scale-95"
          )}
        >
          <LucideCheck
            className={cn(
              "fade-in-0 zoom-in-95 h-4 w-4 animate-in"
            )}
          />
        </div>
        Rust
      </CommandItem>
    </CommandGroup> */}
						<CommandGroup heading="Category">
							<CommandItem
								onSelect={() => {
									handleFreeProvidersChange(filter?.freeProviders);
									setOpen(true);
								}}
							>
								<div
									className={cn(
										"mr-2 flex h-4 w-4 items-center justify-center rounded-lg border border-primary",
										filter?.freeProviders
											? "bg-primary text-primary-foreground"
											: "opacity-50 [&_svg]:hidden",
									)}
								>
									<LucideCheck
										className={cn("fade-in-0 zoom-in-50 h-4 w-4 animate-in")}
									/>
								</div>
								<LucideCircleDollarSign className="size-5" />
								Free tier
								<span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
									{providers.filter((p) => p.has_free_tier).length}
								</span>
							</CommandItem>
							{categories.map((category) => {
								const isSelected = filter?.category?.includes(category.id);
								return (
									<CommandItem
										key={category.id}
										onSelect={() => {
											if (isSelected) {
												handleCategoryChange(category.id, {
													type: "remove",
												});
											} else {
												handleCategoryChange(category.id, {
													type: "add",
												});
											}
											setOpen(true);
										}}
									>
										<div
											className={cn(
												"mr-2 flex h-4 w-4 items-center justify-center rounded-lg border border-primary",
												isSelected
													? "bg-primary text-primary-foreground"
													: "opacity-50 [&_svg]:hidden",
											)}
										>
											<LucideCheck
												className={cn(
													"fade-in-0 zoom-in-50 h-4 w-4 animate-in",
												)}
											/>
										</div>
										<LucideIcon name={category.icon} className="size-5" />
										{category.name}
										<span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
											{
												providers
													.flatMap((provider) => provider.categories)
													.filter((c) => c.id === category.id).length
											}
										</span>
									</CommandItem>
								);
							})}
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
