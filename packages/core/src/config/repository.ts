import { PendapatanRepository } from "@/repository/pendapatan";
import { prisma } from "@pkrbt/db";

export const repository = {
  pendapatan: new PendapatanRepository(prisma),
};
