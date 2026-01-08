import { createAuthClient } from "better-auth/react";
import { redirect } from "react-router";
import { adminClient } from "better-auth/client/plugins";
import { permissions } from "./permissions";

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ...permissions,
    }),
  ],
});

export async function signInWithGoogle() {
  await authClient.signIn.social({
    provider: "google",
    fetchOptions: {
      onSuccess: () => {
        redirect("/");
      },
    },
  });
}

export function useLogout() {}
