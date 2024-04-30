import { defineField, defineType } from "sanity";
import { LucideSquareLibrary } from "lucide-react";

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
        "The ion taked from lucide.dev, select an icon and click copy as JSX, then paste here, add 'Lucide' prefix and remove '</>'.\nExample: <Database /> → LucideDatabase",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
