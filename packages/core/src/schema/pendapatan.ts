import { z } from "@pkrbt/utils";
import { pager } from "./api";

const model = z.object({
  id: z.string(),
  tanggal: z.date(),
  sumber: z.enum(["kolekte1", "kolekte2", "kolekte3", "teks-misa", "parkir"]),
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
  searchResponse: {},
  model,
};
