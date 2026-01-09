import type { User } from "shared/types";
import { auth } from "~/lib/auth.server";

export async function update(userId: string, user: User, headers: HeadersInit) {
  return await auth.api.adminUpdateUser({
    body: {
      userId,
      data: {
        name: user.name,
        role: user.role,
      },
    },
    headers,
  });
}
