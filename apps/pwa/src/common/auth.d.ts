import { DefaultSession } from "next-auth";

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    user?: DefaultSession["user"];
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      emailVerified: boolean;
      id: string;
    } & DefaultSession["user"];
  }
}
