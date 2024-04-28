import { defineField, defineType } from "sanity";

export const categorySchema = defineType({
  name: "category",
  title: "Category",
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
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
