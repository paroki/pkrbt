import { config, singleton } from "@pkrbt/util";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client";

function createPrisma() {
  const adapter = new PrismaPg({
    connectionString: config.database.url,
  });
  return new PrismaClient({ adapter });
}

const prisma = singleton("prisma", createPrisma);

export default prisma;

export * from "./generated/client";
