import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Provider } from "@/types/provider";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isAwsProvider(providerName: Provider["name"]) {
  return providerName === "Amazon Web Services";
}
