import { type SchemaTypeDefinition } from "sanity";
import { categorySchema } from "./schemas/category";
import { providerSchema } from "./schemas/provider";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [providerSchema, categorySchema],
};
