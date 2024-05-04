import { LucideSquareLibrary } from "lucide-react";
import { defineField, defineType } from "sanity";

export const categorySchema = defineType({
	name: "category",
	title: "Category",
	icon: LucideSquareLibrary,
	type: "document",
	fields: [
		defineField({
			name: "id",
			type: "string",
			validation: (rule) => rule.required() && rule.lowercase(),
			description: "The ID of the category sluggified. Example: category-name",
		}),
		defineField({
			name: "name",
			description: "The name of the category",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "icon",
			description:
				"The icon is taked from lucide.dev, select an icon and copy the name of the icon, then paste here.",
			type: "string",
			validation: (rule) => rule.required(),
		}),
	],
});
