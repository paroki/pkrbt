import { Authenticator } from "remix-auth";
import { commitSession, getSession, sessionStorage } from "./session.server";
import { User } from "@pkrbt/directus";
import { getSessionToken } from "./user.server";
import { redirect } from "@remix-run/react";
import { UserRole as AuthUserRole } from "~/pkg/auth/types";

export type AuthenticatedUser = {
  id: string;
  profile: Pick<Partial<User>, "avatar" | "foto"> & { nama: string };
  role: AuthUserRole;
  expiredAt: number;
  policies: string[];
  token: string;
};

export const authenticator = new Authenticator<AuthenticatedUser>(
  sessionStorage,
);

export async function getAuthenticatedUser(request: Request) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
}

export async function verifyUser(request: Request) {
  const authUser = await getAuthenticatedUser(request);
  let headers: Headers | undefined = undefined;
  const token = getSessionToken(request);
  if (!token) {
    redirect("/login");
  }

  if (token && token !== authUser.token) {
    authUser.token = token;
    const session = await getSession(request.headers.get("coookie"));
    session.set(authenticator.sessionKey, authUser);

    headers = new Headers({
      "Set-Cookie": await commitSession(session),
    });
  }
  return { authUser, headers };
}
