import prisma from "~/lib/prisma.server";

export async function findByEmail(email: string) {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
}
