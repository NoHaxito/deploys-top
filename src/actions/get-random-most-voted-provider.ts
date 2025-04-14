"use server";

import { db } from "@/db";
import { queries } from "@/lib/groq-queries";
import { client } from "@/sanity/lib/client";
import type { Provider } from "@/types/provider";

export async function getRandomMostVotedProvider() {
	const providers = await client.fetch<Provider[]>(queries.allProviders);

	// Get vote counts using SQL aggregation
	const voteCounts = await db
		.selectFrom("vote")
		.select(["provider_id"])
		.select((eb) => [
			eb.fn
				.count<number>("vote_type")
				.filterWhere("vote_type", "=", "upvote")
				.as("upvotes"),
		])
		.groupBy("provider_id")
		// @ts-ignore
		.having("upvotes", ">", 0)
		.execute();

	if (voteCounts.length === 0) {
		// If no votes, return a random provider
		const randomIndex = Math.floor(Math.random() * providers.length);
		return JSON.stringify(providers[randomIndex]);
	}

	const randomVote = voteCounts[Math.floor(Math.random() * voteCounts.length)];
	const randomProvider = providers.find(
		(provider) => provider.id === randomVote.provider_id,
	);

	// Fallback to first provider if somehow the voted provider is not found
	return JSON.stringify(randomProvider || providers[0]);
}
