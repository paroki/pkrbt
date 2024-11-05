import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { DIRECTUS_TOKEN_NAME, DIRECTUS_URL } from "./config";
import { createDirectus, readMe, rest, staticToken } from "@directus/sdk";
import { Schema } from "@pkrbt/directus";
import { UserR } from "@/pkg/user/types";
import { UserPolicy } from "./types";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] &
      UserR & {
        id: string;
      };
    policies: string[];
  }
}

export async function getSessionToken() {
  const cookie = cookies();
  const token = cookie.get(DIRECTUS_TOKEN_NAME)?.value as string;
  return token;
}

/**
 * get current user policies
 */
export async function getAuthenticatedUser() {
  const token = await getSessionToken();
  const client = createDirectus<Schema>(DIRECTUS_URL)
    .with(staticToken(token))
    .with(rest());
  const user = await client.request(
    readMe({
      fields: ["*", { role: [{ policies: ["*"] }] }, { policies: ["*"] }],
    }),
  );
  return user as unknown as UserR;
}

export function extractPolicy(user: UserR) {
  const policies: string[] = [];
  user.policies?.map((item) => {
    if (typeof item == "object") {
      const policy = item as unknown as UserPolicy;
      policies.push(policy.policy);
    }
  });

  if (user.role && typeof user.role === "object") {
    if (user.role.policies && user.role.policies.length > 0) {
      user.role.policies.map((item) => {
        const policy = item as unknown as UserPolicy;
        policies.push(policy.policy);
      });
    }
  }

  return policies;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize() {
        const currentUser = await getAuthenticatedUser();

        return {
          ...currentUser,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        const authUser = await getAuthenticatedUser();

        session.user = {
          ...authUser,
          emailVerified: null,
        };

        session.policies = extractPolicy(authUser);
      }
      return session;
    },
  },
});
