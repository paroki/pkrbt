import prisma from "./client";
import type { User } from "@/generated/client";

const users = [
  {
    name: "Anthonius Munthi",
    email: "me@itstoni.com",
  },
] satisfies Partial<User>[];

async function main() {
  users.map(async (user) => {
    const r = await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {
        ...user,
      },
      create: {
        ...user,
      },
    });

    console.log(r);
  });
}

main();
