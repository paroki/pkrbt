import { auth } from "~/lib/auth.server";

export async function list(search: any, headers?: HeadersInit) {
  return await auth.api.listUsers({
    query: {
      limit: 10,
      sortBy: "name",
    },
    headers,
  });
}
