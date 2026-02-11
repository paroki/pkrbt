import prisma from "@pkrbt/prisma";
import { config, uuid } from "@pkrbt/util";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  baseURL: config.api.url,
  basePath: "/auth",
  secret: config.auth.secret,
  appName: "pkrbt",
  emailAndPassword: {
    enabled: true,
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  advanced: {
    cookiePrefix: config.auth.cookiePrefix,
    crossSubDomainCookies: {
      enabled: true,
    },
    database: {
      generateId: () => uuid(),
    },
  },
  plugins: [admin(), nextCookies()],
});
