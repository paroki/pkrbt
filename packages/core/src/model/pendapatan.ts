import schema from "@/schema";
import { PendapatanModel } from "@pkrbt/db";
import { z } from "@pkrbt/utils";

export type Pendapatan = PendapatanModel;
export type PendapatanSearchRequest = z.infer<
  typeof schema.pendapatan.search.request
>;
export type PendapatanUpdateRequest = z.infer<
  typeof schema.pendapatan.update.request
>;
export type PendapatanUpdateResponse = z.infer<
  typeof schema.pendapatan.update.response
>;
export type PendapatanCreateRequest = z.infer<
  typeof schema.pendapatan.create.request
>;
export type PendapatanCreateResponse = z.infer<
  typeof schema.pendapatan.create.response
>;
