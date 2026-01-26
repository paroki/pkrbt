import { betterAuth } from "better-auth";
import { admin, emailOTP, oneTap } from "better-auth/plugins";
import { invariant } from "@pkrbt/utils";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@pkrbt/db";
import { nextCookies } from "better-auth/next-js";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

invariant(GOOGLE_CLIENT_ID, "GOOGLE_CLIENT_ID env unconfigured");
invariant(GOOGLE_CLIENT_SECRET, "GOOGLE_CLIENT_SECRET env unconfigured");

export const auth = betterAuth({
  basePath: "/auth",
  trustedOrigins: [
    "http://localhost:3000",
    "https://dash.pkrbt.id",
    "https://pkrbt.id",
  ],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      prompt: "consent",
    },
  },
  plugins: [
    admin(),
    emailOTP({
      async sendVerificationOTP(data, ctx) {},
    }),
    oneTap({
      clientId: GOOGLE_CLIENT_ID,
    }),
    nextCookies(),
  ],
});
