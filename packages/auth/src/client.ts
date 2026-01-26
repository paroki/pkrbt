import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:2000",
  basePath: "/auth",
  plugins: [adminClient()],
});

export type { BetterFetchError } from "better-auth/client";
