import { DefaultSession } from "next-auth";
import { UserR } from "./types";

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    user?: UserR;
  }
}

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] &
      UserR & {
        id: string;
      };
    policies: string[];
  }
}
