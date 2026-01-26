import schema from "@/schema";
import { PendapatanModel } from "@pkrbt/db";
import { z } from "@pkrbt/utils";

export type Pendapatan = PendapatanModel;
export type PendapatanSearchRequest = z.infer<
  typeof schema.pendapatan.search.request
>;
