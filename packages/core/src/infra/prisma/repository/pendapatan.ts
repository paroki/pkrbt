import prisma, { Prisma } from "@pkrbt/prisma";
import type { Pendapatan } from "../../../entity";
import { ErrNotFound } from "../../../error";
import type {
  CreateRequest,
  ItemResponse,
  PendapatanSearchRequest,
  SearchResponse,
  UpdateRequest,
} from "../../../model";
import { schema } from "../../../schema";
import type { IPendapatanRepository } from "../../../service";
import { PrismaError } from "../error";

export class PendapatanRepository implements IPendapatanRepository {
  async search(request: PendapatanSearchRequest): SearchResponse<Pendapatan> {
    let where: Prisma.PendapatanFindManyArgs["where"] = undefined;
    const orderBy: Prisma.PendapatanFindManyArgs["orderBy"] = undefined;
    const hasFilter = request.keyword || request.sumber;

    if (hasFilter) {
      where = {};
    }
    if (request.keyword) {
      where = {
        OR: [
          {
            uraian: {
              contains: request.keyword,
              mode: "insensitive",
            },
          },
          {
            catatan: {
              contains: request.keyword,
              mode: "insensitive",
            },
          },
        ],
      };
    }

    if (request.sumber) {
      where = {
        ...where,
        sumber: request.sumber,
      };
    }

    try {
      const [total, res] = await prisma.$transaction([
        prisma.pendapatan.count({ where }),
        prisma.pendapatan.findMany({
          skip: (request.page - 1) * 10,
          take: request.size,
          where,
          orderBy
        }),
      ]);
      if (total > 0) {
        const data = schema.pendapatan.collection.parse({ items: res, total });
        return [data, null];
      }
    } catch (e) {
      return [null, new PrismaError(e)];
    }

    return [null, ErrNotFound];
  }

  async find(id: string): ItemResponse<Pendapatan> {
    try {
      const res = await prisma.pendapatan.findUniqueOrThrow({
        where: { id },
      });
      const data = schema.pendapatan.entity.parse(res);
      return [data, null];
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code == "P2025"){
        return [null, ErrNotFound]
      }
      return [null, new PrismaError(e)];
    }
  }

  async create(request: CreateRequest<Pendapatan>): ItemResponse<Pendapatan> {
    try {
      const res = await prisma.pendapatan.create({
        data: request,
      });
      const data = schema.pendapatan.entity.parse(res);
      return [data, null];
    } catch (e) {
      return [null, new PrismaError(e)];
    }
  }

  async update(
    id: string,
    request: UpdateRequest<Pendapatan>,
  ): ItemResponse<Pendapatan> {
    try {
      const res = await prisma.pendapatan.update({
        data: request,
        where: {
          id,
        },
      });
      const data = schema.pendapatan.entity.parse(res);
      return [data, null];
    } catch (e) {
      return [null, new PrismaError(e)];
    }
  }

  async delete(id: string, force: boolean): ItemResponse<Pendapatan> {
    if (!force) {
      return this.softDelete(id);
    }

    try {
      const res = await prisma.pendapatan.delete({
        where: { id },
      });
      const data = schema.pendapatan.entity.parse(res);
      return [data, null];
    } catch (e) {
      return [null, new PrismaError(e)];
    }
  }

  private async softDelete(id: string): ItemResponse<Pendapatan> {
    try {
      const res = await prisma.pendapatan.update({
        where: { id },
        data: {
          deletedAt: new Date,
        },
      });
      const data = schema.pendapatan.entity.parse(res);
      return [data, null];
    } catch (e) {
      return [null, new PrismaError(e)];
    }
  }
}
