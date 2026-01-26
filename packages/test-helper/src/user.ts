import { auth } from "@pkrbt/auth/server";
import { prisma } from "@pkrbt/db";

export type User = {
  name: string;
  email: string;
  roles?: string;
};

export async function iHaveUser(payload: User) {
  if (!payload.roles) {
    payload.roles = "user";
  }

  const test = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (null == test) {
    const { user } = await auth.api.createUser({
      body: {
        ...payload,
        password: "testing",
      },
    });

    return user;
  }
  return test;
}
