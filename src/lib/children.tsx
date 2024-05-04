/**
 * Taked from https://github.com/nextui-org/nextui/blob/main/packages/utilities/react-rsc-utils/src/children.ts
 * All credits to the respective author
 */
import { Children, type ReactNode, isValidElement } from "react";

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param children the children
 */
export function getValidChildren(children: React.ReactNode) {
	return Children.toArray(children).filter((child) =>
		isValidElement(child),
	) as React.ReactElement[];
}

export const pickChildren = <T = ReactNode>(
	children: T | undefined,
	targetChild: React.ElementType,
): [T | undefined, T[] | undefined] => {
	const target: T[] = [];

	const withoutTargetChildren = Children.map(children, (item) => {
		if (!isValidElement(item)) return item;
		if (item.type === targetChild) {
			target.push(item as T);

			return null;
		}

		return item;
	})?.filter(Boolean) as T;

	const targetChildren = target.length >= 0 ? target : undefined;

	return [withoutTargetChildren, targetChildren];
};
