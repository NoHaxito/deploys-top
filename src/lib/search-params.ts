import { parseAsFloat, createSearchParamsCache } from "nuqs/server";

export const filtersParser = {
	lat: parseAsFloat.withDefault(45.18),
	lng: parseAsFloat.withDefault(5.72),
};
export const filtersCache = createSearchParamsCache(filtersParser);
