"use client";

import { Badge } from "@/components/ui/badge";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import * as React from "react";

export function SupportedTypesPopover({
	supported_types,
}: {
	supported_types: string[];
}) {
	const [open, setOpen] = React.useState(false);
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger onClick={(e) => e.stopPropagation()}>
				<Badge variant="outline">+{supported_types?.length - 1} more</Badge>
			</PopoverTrigger>
			<PopoverContent className="p-2 text-sm">
				{supported_types.map((type) => (
					<Badge key={type} variant="outline">
						{type}
					</Badge>
				))}
			</PopoverContent>
		</Popover>
	);
}
