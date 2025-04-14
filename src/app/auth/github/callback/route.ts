import { github, lucia } from "@/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { db } from "@/db";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedNext = (await cookies()).get("next")?.value ?? "/";
  const storedState = (await cookies()).get("github_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUser: GitHubUser = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    }).then((res) => res.json());

    const existingUser = await db
      .selectFrom("user")
      .where("github_id", "=", githubUser.id)
      .selectAll()
      .executeTakeFirst();

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      (await cookies()).delete("next");
      return new Response(null, {
        status: 302,
        headers: {
          Location: storedNext,
        },
      });
    }

    const userId = generateId(15);
    await db
      .insertInto("user")
      .values({
        id: userId,
        github_id: githubUser.id,
        username: githubUser.login,
        avatar_url: githubUser.avatar_url,
      })
      .execute();

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (e: any) {
    console.log(e);
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }

  interface GitHubUser {
    id: number;
    login: string;
    email: string | null;
    avatar_url: string;
  }
  interface GithubEmails {
    email: string;
    primary: boolean;
    verified: boolean;
    visibility: string;
  }
}
