import { repository } from "./repository";
import { PendapatanService } from "@/service/pendapatan";
import { singleton } from "@pkrbt/utils";

export const service = singleton("service", () => {
  return {
    pendapatan: singleton("service.pendapatan", () => {
      return new PendapatanService(repository.pendapatan);
    }),
  };
});
