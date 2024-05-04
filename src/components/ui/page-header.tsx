import { pickChildren } from "@/lib/children";
import { cn } from "@/lib/utils";
import type React from "react";

function PageHeader({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const [childrenWithoutActions, actions] = pickChildren(
		children,
		PageHeaderActions,
	);
	return (
		<div
			className={cn(
				"flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center",
				className,
			)}
			{...props}
		>
			<div>{childrenWithoutActions}</div>
			{actions}
		</div>
	);
}

function PageHeaderTitle({
	icon,
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
	icon?: React.ReactNode;
}) {
	return (
		<div className="flex items-center gap-2">
			{icon && icon}
			<h1
				className={cn(
					"font-bold text-lg tracking-tight md:text-3xl",
					className,
				)}
				{...props}
			/>
		</div>
	);
}

function PageHeaderDescription({
	className,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
	return (
		<span
			className={cn("text-muted-foreground text-xs sm:text-sm", className)}
			{...props}
		/>
	);
}

function PageHeaderActions({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("flex items-center justify-center space-x-1", className)}
			{...props}
		/>
	);
}

export {
	PageHeader,
	PageHeaderTitle,
	PageHeaderDescription,
	PageHeaderActions,
};
