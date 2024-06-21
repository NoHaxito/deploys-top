"use server";

import { db } from "@/db";

export async function vote(
  provider_id: string,
  user_id: string,
  vote_type: "upvote" | "downvote",
  currentVote: "upvote" | "downvote" | undefined
) {
  try {
    if (currentVote !== undefined) {
      if (currentVote === vote_type) {
        await db
          .deleteFrom("vote")
          .where("provider_id", "=", provider_id)
          .where("user_id", "=", user_id)
          .execute();
        return JSON.stringify(true);
      }
      await db
        .updateTable("vote")
        .set({
          vote_type,
        })
        .where("provider_id", "=", provider_id)
        .where("user_id", "=", user_id)
        .execute();
      return JSON.stringify(true);
    }
    await db
      .insertInto("vote")
      .values({
        provider_id,
        user_id,
        vote_type,
      })

      .execute();

    return JSON.stringify(true);
  } catch (error) {
    return JSON.stringify(error);
  }
}
