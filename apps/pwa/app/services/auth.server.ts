import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { User } from "@pkrbt/directus";

export type AuthenticatedUser = {
  id: string;
  profile: Pick<Partial<User>, "avatar" | "foto"> & { nama: string };
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
