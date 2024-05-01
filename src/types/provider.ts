import { Category } from "./category";

export interface Provider {
  description: string;
  good_free_tier: boolean;
  has_free_tier: boolean;
  href: boolean;
  icon: string;
  is_serverless: boolean;
  name: string;
  pricing_href: string;
  services_offered: ServiceOffered[];
  categories: Category[];
}
export interface ServiceOffered {
  category_name: Category["id"];
  name: string;
  pricing: {
    free_tier: {
      included: string;
      price_per_gb?: string;
      type: string;
    }[];
  };
  supported_types: string[];
}
