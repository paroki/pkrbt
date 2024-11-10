import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { DEVELOPMENT, DIRECTUS_TOKEN_NAME, DIRECTUS_URL } from "./config";
import {
  authentication,
  createDirectus,
  readMe,
  readPolicies,
  rest,
  staticToken,
} from "@directus/sdk";
import { Schema } from "@pkrbt/directus";
import { UserR } from "@/pkg/user/types";
import { Policies, UserPolicy } from "./types";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] &
      UserR & {
        id: string;
      };
    userPolicies: string[];
    policies: Policies;
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

export async function login(email: string, password: string) {
  const client = createDirectus<Schema>(DIRECTUS_URL)
    .with(authentication("json"))
    .with(rest());

  const result = await client.login(email, password);

  const store = cookies();
  store.set({
    name: DIRECTUS_TOKEN_NAME,
    value: result.access_token as string,
    secure: true,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });

  return await getAuthenticatedUser();
}

async function getPolicies() {
  const token = await getSessionToken();
  const client = createDirectus<Schema>(DIRECTUS_URL)
    .with(staticToken(token))
    .with(rest());

  const result = await client.request(
    readPolicies({
      fields: ["id", "name"],
    }),
  );

  const policies: Partial<Policies> = {};

  result.map((item) => {
    if (item.name == "Pengurus Harian DPP") {
      policies.PengurusHarianDPP = item.id;
    }
    if (item.name == "Administrator") {
      policies.Administrator = item.id;
    }
    if (item.name == "Author") {
      policies.Author = item.id;
    }
  });

  return policies as Required<Policies>;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: DEVELOPMENT,
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email && !password) {
          return await getAuthenticatedUser();
        }
        const user = await login(email as string, password as string);

        return { ...user };
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

        session.userPolicies = extractPolicy(authUser);
        session.policies = await getPolicies();
      }
      return session;
    },
  },
});
