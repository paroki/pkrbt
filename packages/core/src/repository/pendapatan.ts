import { Prisma, PrismaClient } from "@pkrbt/db";
import {
  Pendapatan,
  PendapatanCreateRequest,
  PendapatanSearchRequest,
} from "@/model";

export class PendapatanRepository {
  protected prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async search(payload: PendapatanSearchRequest) {
    let total = 0;
    let data: Pendapatan[] = [];
    const findArgs: Prisma.PendapatanFindManyArgs = {
      skip: payload.page - 1,
      take: payload.size,
      where: {},
    };

    [data, total] = await this.prisma.$transaction([
      this.prisma.pendapatan.findMany(findArgs),
      this.prisma.pendapatan.count({ where: findArgs.where }),
    ]);

    return { data, total };
  }

  async create(payload: PendapatanCreateRequest) {
    return await this.prisma.pendapatan.create({
      data: payload,
    });
  }
}
