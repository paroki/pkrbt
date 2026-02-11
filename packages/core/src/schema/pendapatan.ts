import { EnumSumberPendapatan } from "@pkrbt/prisma";
import { config, uuid } from "@pkrbt/util";
import { z } from "../util";

export { EnumSumberPendapatan }

const enumSumberPendapatan = z
  .enum(EnumSumberPendapatan)
  .openapi("EnumSumberPendapatan");


const entity = z
  .object({
    id: z.uuidv7().openapi({
      example: uuid(),
    }),
    tanggal: z.coerce.date().openapi({
      example: (new Date()).toISOString()
    }),
    sumber: enumSumberPendapatan,
    uraian: z.string(),
    catatan: z.string().nullable(),
    jumlah: z.coerce.number(),
    deletedAt: z.coerce.date().nullable()
  })
  .openapi("Pendapatan", {
    description: "pendapatan resource",
  });

export const schPendapatan = {
  entity,
  search: z.object({
    keyword: z.string().optional(),
    sumber: enumSumberPendapatan.optional(),
    page: z.number().optional().default(1),
    size: z.number().optional().default(config.database.pageSize),
  }).openapi("PendapatanSearchRequest"),
  create: entity.omit({ id: true }).openapi("PendapatanCreateRequest"),
  update: entity.partial().omit({id: true}).openapi("PendapatanUpdateRequest"),
  delete: z.object({
    id: z.uuidv7(),
    force: z.boolean().default(false),
  }),
  collection: z.object({
    total: z.number(),
    items: z.array(entity)
  }).openapi("PendapatanCollection", {
    description: "Pendapatan Resource Collection"
  })
}
