import { singleton } from "@pkrbt/utils";
import { Prisma, prisma } from "@pkrbt/db";
import { Pendapatan, PendapatanSearchRequest } from "@/model";
import { CoreError, RepositoryError } from "@/error";

export class PendapatanRepository {
  async search(payload: PendapatanSearchRequest) {
    const where: Prisma.UserFindManyArgs["where"] = undefined;
    let total = 0;
    let data: Pendapatan[] = [];
    [data, total] = await prisma.$transaction([
      prisma.pendapatan.findMany({
        where,
        skip: payload.page - 1,
        take: payload.size,
      }),
      prisma.pendapatan.count({ where }),
    ]);

    return { data, total };
  }
}

export const pendapatan = singleton(
  "repository.pendapatan",
  () => new PendapatanRepository(),
);
