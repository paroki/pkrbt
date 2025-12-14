import { singleton } from "@pkrbt/common";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@pkrbt/database";
import invariant from "tiny-invariant";
import { admin, organization } from "better-auth/plugins";

const auth = singleton("better-auth", getBetterAuth);

function getBetterAuth() {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

  invariant(GOOGLE_CLIENT_ID, "google client id unconfigured");
  invariant(GOOGLE_CLIENT_SECRET, "google client secret unconfigured");

  return betterAuth({
    database: prismaAdapter(prisma, {
      provider: "postgresql",
    }),
    trustedOrigins: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://pkrbt.id",
      "https://dash.pkrbt.id",
    ],
    socialProviders: {
      google: {
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        prompt: "select_account",
      },
    },
    advanced: {
      cookiePrefix: "pkrbt-auth",
    },
    plugins: [admin(), organization()],
  });
}

export { auth };
