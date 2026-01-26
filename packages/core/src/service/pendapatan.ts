import { RepositoryError } from "@/error";
import { Pendapatan, PendapatanSearchRequest } from "@/model";
import { repository } from "@/repository";
import { singleton } from "@pkrbt/utils";

type SearchPromise = {
  data: Pendapatan[];
  total: number;
};
export class PendapatanService {
  async search(payload: PendapatanSearchRequest): Promise<SearchPromise> {
    return await repository.pendapatan.search(payload);
  }
}

export const pendapatan = singleton(
  "service.pendapatan",
  () => new PendapatanService(),
);
