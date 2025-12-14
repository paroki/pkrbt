import { singleton } from "@pkrbt/common";
import { PrismaClient } from "@pkrbt/database";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = singleton("prisma", getPrismaClient);

function getPrismaClient() {
  const { DATABASE_URL } = process.env;

  const adapter = new PrismaPg({
    connectionString: DATABASE_URL,
  });

  return new PrismaClient({
    adapter,
  });
}

export { prisma };
