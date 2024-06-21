import { Kysely } from "kysely";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import { createClient } from "@libsql/client";

interface Database {
  user: UserTable;
  session: SessionTable;
  vote: VoteTable;
}

interface UserTable {
  id: string;
  username: string;
  avatar_url: string;
  github_id: number;
}

interface SessionTable {
  id: string;
  user_id: string;
  expires_at: Date;
}

export interface VoteTable {
  vote_id?: number;
  user_id: string;
  provider_id: string;
  vote_type: "upvote" | "downvote";
}

export const client = createClient({
  // biome-ignore lint/style/noNonNullAssertion:
  url: process.env.DATABASE_URL!,
  // biome-ignore lint/style/noNonNullAssertion:
  authToken: process.env.DATABASE_AUTH_TOKEN!,
});

export const db = new Kysely<Database>({
  dialect: new LibsqlDialect({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  }),
});
