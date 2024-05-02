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
          weak: true,
        }),
      ],
    }),
    defineField({
      name: "id",
      type: "string",
      description:
        "Name of the provider in lowercase and slugified. Example: provider-name",
      validation: (rule) => rule.required(),
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
      description: "The url of the provider logo (ask to nohaxito)",
    }),
    defineField({
      name: "href",
      type: "url",
      validation: (rule) => rule.required(),
      description: "The link to the provider page",
    }),
    defineField({
      name: "pricing_href",
      type: "url",
      validation: (rule) => rule.required(),
      description: "The link to the provider pricing page",
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
              description:
                "This name must be match with the 'id' from the 'Category' document.",
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
                      description:
                        "Fill the necessary fields, don't fill with unkown data.",
                      fields: [
                        {
                          name: "type",
                          type: "string",
                          validation: (rule) => rule.required(),
                        },
                        {
                          name: "included",
                          type: "string",
                          validation: (rule) => rule.required(),
                        },
                        { name: "price_per_gb", type: "string" },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "disabled",
              type: "boolean",
              initialValue: false,
            },
          ],
        },
      ],
    }),
    defineField({
      name: "has_free_tier",
      type: "boolean",
      initialValue: false,
      description: "If the provider has a free tier.",
    }),
    defineField({
      name: "good_free_tier",
      type: "boolean",
      initialValue: false,
      description: "If the provider has a good free tier.",
    }),
    defineField({
      name: "is_serverless",
      type: "boolean",
      initialValue: false,
      description: "If the provider is serverless.",
    }),
  ],
});
