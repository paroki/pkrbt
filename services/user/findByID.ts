import type { User } from "shared/types";
import { auth } from "~/lib/auth.server";

export async function findByID(id: string, headers?: HeadersInit) {
  return (await auth.api.getUser({
    query: {
      id,
    },
    headers,
  })) as User;
}
