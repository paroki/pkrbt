import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import invariant from "tiny-invariant";

export const authClient = createAuthClient({
  //you can pass client configuration here
  //baseURL: BETTER_AUTH_URL,
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
