"use server";
import { getSession, lucia } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async (redirectTo = "/") => {
  const { session } = await getSession();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect(redirectTo);
};
