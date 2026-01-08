import { betterAuth } from "better-auth";
import { admin as adminPlugin } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma.server";
import {
  BETTER_AUTH_SECRET,
  BETTER_AUTH_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  IS_PRODUCTION,
} from "./config";
import { permissions } from "./permissions";

export const auth = betterAuth({
  secret: BETTER_AUTH_SECRET,
  baseURL: BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: IS_PRODUCTION,
  },
  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET,
      prompt: "select_account consent",
      accessType: "offline",
    },
  },
  plugins: [
    adminPlugin({
      ...permissions,
      defaultRole: "user",
    }),
  ],
});
