import { singleton } from "@pkrbt/utils";
import { PendapatanRepository } from "./pendapatan";
import { prisma } from "@pkrbt/db";

export const repository = {
  pendapatan: singleton("repository.pendapatan", () => {
    return new PendapatanRepository(prisma);
  }),
};

export default repository;
