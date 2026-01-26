import { z } from "@pkrbt/utils";

export const pager = z.object({
  page: z.number(),
  size: z.number(),
  total: z.number(),
});
