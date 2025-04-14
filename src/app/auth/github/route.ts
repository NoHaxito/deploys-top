import { github } from "@/auth";
import { generateState } from "arctic";
import { cookies } from "next/headers";

export async function GET(request: Request): Promise<Response> {
  const state = generateState();
  const next = new URL(request.url).searchParams.get("next") ?? "/";
  (await cookies()).set("next", next, {
    secure: process.env.NODE_ENV === "production",
  });
  const url = await github.createAuthorizationURL(state, {
    scopes: ["user:email"],
  });

  (await cookies()).set("github_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return Response.redirect(url);
}
