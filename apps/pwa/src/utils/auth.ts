import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import api from "./api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider == "google" && account?.access_token) {
        token.api = await api.oauthLogin("google", account.access_token);
      }

      return token;
    },
    async session({ token, session }) {
      if (token.api) {
        session.api = token.api;
      }

      return session;
    },
  },
});
