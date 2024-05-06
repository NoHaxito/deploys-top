import type { SchemaTypeDefinition } from "sanity";

import { categorySchema } from "./schemas/category";
import { providerSchema } from "./schemas/provider";
import { planFeatureSchema, planSchema } from "./schemas/plan";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [providerSchema, categorySchema, planSchema, planFeatureSchema],
};
