import { groq } from "next-sanity";

export const queries = {
  allProviders: groq`*[_type == "provider"]{ id, good_free_tier, has_free_tier, name, description, href, pricing_href, is_serverless, "categories": categories[]->{id, name, icon}, icon, services_offered }`,
  getProvider: groq`*[_type == "provider" && id == $id][0]{ id, good_free_tier, has_free_tier, name, description, href, pricing_href, is_serverless, "categories": categories[]->{id, name, icon}, icon, services_offered }`,
  serverlessProviders: groq`*[_type == "provider" && is_serverless]{ id, good_free_tier, has_free_tier, name, description, href, pricing_href, is_serverless, "categories": categories[]->{id, name, icon}, icon, services_offered }`,
  freeProviders: groq`*[_type == "provider" && has_free_tier]{ id, good_free_tier, has_free_tier, name, description, href, pricing_href, is_serverless, "categories": categories[]->{id, name, icon}, icon, services_offered }`,
  allCategories: groq`*[_type == "category"]{ id, name, icon }`,
};
