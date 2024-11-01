import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { DIRECTUS_TOKEN_NAME, DIRECTUS_URL } from "./config";
import { createDirectus, readMe, rest, staticToken } from "@directus/sdk";
import { Schema } from "@pkrbt/directus";
import { AdapterUser } from "next-auth/adapters";

export async function getSessionToken() {
  const cookie = cookies();
  const token = cookie.get(DIRECTUS_TOKEN_NAME)?.value as string;
  return token;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize() {
        const token = await getSessionToken();
        const client = createDirectus<Schema>(DIRECTUS_URL)
          .with(staticToken(token))
          .with(rest());
        const currentUser = await client.request(
          readMe({
            fields: [
              "*",
              {
                role: [
                  "id",
                  "name",
                  {
                    policies: ["id"],
                  },
                ],
              },
            ],
          }),
        );

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
        session.user = token.user as AdapterUser & User;
      }

      return session;
    },
  },
});
