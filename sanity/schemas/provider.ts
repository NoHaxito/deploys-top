import { defineField, defineType } from "sanity";
import { LucideLayoutPanelLeft } from "lucide-react";

export const providerSchema = defineType({
  name: "provider",
  title: "Provider",
  icon: LucideLayoutPanelLeft,
  type: "document",
  fields: [
    defineField({
      name: "categories",
      type: "array",
      of: [
        defineField({
          name: "category_name",
          type: "reference",
          to: [{ type: "category" }],
        }),
      ],
    }),
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pricing_href",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "services_offered",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "category_name",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "name",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "description",
              type: "string",
            },
            {
              name: "supported_types",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "pricing",
              type: "object",
              fields: [
                {
                  name: "free_tier",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        { name: "type", type: "string" },
                        { name: "included", type: "string" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "has_free_tier",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "is_serverless",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
