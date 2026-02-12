import type { Pendapatan } from "../entity";
import type { ItemResponse, PendapatanCreateRequest, PendapatanSearchRequest, PendapatanUpdateRequest } from "../model";

export interface IPendapatanService{
  find(id: string): Promise<Pendapatan>
  search(request: PendapatanSearchRequest): Promise<{items: Pendapatan[], total: number}>
  create(request: PendapatanCreateRequest): Promise<Pendapatan>
  update(id: string, request: PendapatanUpdateRequest): Promise<Pendapatan>
  delete(id: string, force: boolean): Promise<Pendapatan>
}
