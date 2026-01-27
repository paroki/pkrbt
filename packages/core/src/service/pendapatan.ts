import { Pendapatan, PendapatanSearchRequest } from "@/model";
import { UserUpdateInput } from "@pkrbt/db";

type SearchPromise = {
  data: Pendapatan[];
  total: number;
};

export interface PendapatanRepositoryInterface {
  search(payload: PendapatanSearchRequest): Promise<SearchPromise>;
}

export class PendapatanService {
  pendapatan: PendapatanRepositoryInterface;
  constructor(repo: PendapatanRepositoryInterface) {
    this.pendapatan = repo;
  }

  async search(payload: PendapatanSearchRequest) {
    return await this.pendapatan.search(payload);
  }
}
