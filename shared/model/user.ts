import { auth } from "~/lib/auth.server";
import prisma from "~/lib/prisma.server";

export const user = {
  async list(headers: HeadersInit) {
    return await auth.api.listUsers({
      query: {
        limit: 10,
        sortBy: "name",
      },
      headers,
    });
  },
  async findByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    });
  },
  async findByID(id: string, headers: HeadersInit) {
    return await auth.api.getUser({
      query: {
        id,
      },
      headers,
    });
  },
};
