import { Lucia, type User, type Session } from "lucia";
import { LibSQLAdapter } from "@lucia-auth/adapter-sqlite";
import { GitHub } from "arctic";
import { client } from "./db";
import { cookies } from "next/headers";
import { cache } from "react";

const adapter = new LibSQLAdapter(client, {
  user: "user",
  session: "session",
});

export const github = new GitHub(
  // biome-ignore lint/style/noNonNullAssertion:
  process.env.GITHUB_CLIENT_ID!,
  // biome-ignore lint/style/noNonNullAssertion:
  process.env.GITHUB_CLIENT_SECRET!
);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      githubId: attributes.github_id,
      username: attributes.username,
      avatar_url: attributes.avatar_url,
    };
  },
});

export const getSession = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session?.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        (await cookies()).set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        (await cookies()).set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {}
    return result;
  }
);

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  github_id: number;
  username: string;
  avatar_url: string;
}
