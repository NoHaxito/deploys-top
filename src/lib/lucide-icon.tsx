import { LucideLoader2, type LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import dynamic from "next/dynamic";
import React from "react";

interface IconProps extends LucideProps {
	name: string;
}
const fallback = (
	<div>
		<LucideLoader2 className="size-5 min-h-5 min-w-5 animate-spin" />
	</div>
);
const _Icon = ({ name, ...props }: IconProps) => {
	const Icon = dynamic(
		dynamicIconImports[name as keyof typeof dynamicIconImports],
		{
			loading: () => fallback,
		},
	);

	return <Icon {...props} />;
};

export const LucideIcon = ({ name, ...props }: IconProps) => {
	const Icon = React.useMemo(
		() =>
			dynamic(dynamicIconImports[name as keyof typeof dynamicIconImports], {
				loading: () => fallback,
			}),
		[],
	);

	return <Icon {...props} />;
};

export const _LucideIcon = React.memo(_Icon);
