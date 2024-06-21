"use server";

import { db } from "@/db";
import { queries } from "@/lib/groq-queries";
import { client } from "@/sanity/lib/client";
import type { Provider } from "@/types/provider";

export async function getRandomMostVotedProvider() {
  const providers = await client.fetch<Provider[]>(queries.allProviders);
  const votes = await db
    .selectFrom("vote")
    .select(["provider_id", "vote_type"])
    .execute();

  const mostVotedProviders = votes.reduce(
    (acc, vote) => {
      if (vote.vote_type === "upvote") {
        const provider = acc.find((p) => p.provider_id === vote.provider_id);
        if (provider) {
          provider.votes += 1;
        } else {
          acc.push({ provider_id: vote.provider_id, votes: 1 });
        }
      }
      return acc;
    },
    [] as { provider_id: string; votes: number }[]
  );

  const randomVote =
    mostVotedProviders[Math.floor(Math.random() * mostVotedProviders.length)];
  const randomProvider = providers.find(
    (provider) => provider.id === randomVote.provider_id
  );

  return JSON.stringify(randomProvider);
}
