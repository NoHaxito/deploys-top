import { defineType } from "sanity";

export const planSchema = defineType({
	type: "object",
	name: "plan",
	fields: [
		{
			type: "string",
			name: "name",
			description:
				"Name of the plan, example: Basic, Free Tier or something like that.",
			validation: (rule) => rule.required().warning("Fill this field"),
		},
		{
			type: "array",
			name: "plan_features",
			of: [
				{
					type: "plan_features",
				},
			],
			validation: (rule) => rule.required().warning("Fill this field"),
		},
	],
	validation: (rule) => rule.required().warning("Fill this field"),
});

export const planFeatureSchema = defineType({
	type: "object",
	name: "plan_features",
	fields: [
		{
			type: "string",
			name: "name",
			description: "Feature name of the plan, example: Bandwith",
			validation: (rule) => rule.required().warning("Fill this field"),
		},
		{
			type: "array",
			name: "values",
			of: [
				{
					type: "object",
					name: "value",
					fields: [
						{
							type: "string",
							name: "key",
							validation: (rule) => rule.required().error("Fill this field"),
						},
						{
							type: "string",
							name: "value",
							validation: (rule) => rule.required().error("Fill this field"),
						},
					],
				},
			],
		},
	],
	validation: (rule) => rule.required().warning("Fill this field"),
});
