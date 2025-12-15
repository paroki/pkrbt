import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react

export const authClient = createAuthClient({
  //you can pass client configuration here
  // baseURL: "http://localhost:5173",
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
