import { z } from "@pkrbt/utils";
import { pager } from "./api";

const model = z.object({
  id: z.string(),
  tanggal: z.date(),
  sumber: z.enum({
    Kolekte1: "kolekte1",
    Kolekte2: "kolekte2",
    Kolekte3: "kolekte3",
    TeksMisa: "teks-misa",
    Parkir: "parkir",
  }),
  keterangan: z.string(),
  catatan: z.string().optional(),
  jumlah: z.number(),
});

export const pendapatan = {
  search: {
    request: z
      .object({
        page: z.number().default(1),
        size: z.number().default(10),
      })
      .describe("pendapatan schema")
      .meta({
        ref: "PendapatanSearchRequest",
      }),
    response: z
      .object({
        data: z.array(model),
        pager,
      })
      .describe("pendapatan search response")
      .meta({
        ref: "PendapatanSearchResponse",
      }),
  },
  update: {
    request: model.omit({ id: true }),
    response: model,
  },
  create: {
    request: model.omit({ id: true }),
    response: model,
  },
};
