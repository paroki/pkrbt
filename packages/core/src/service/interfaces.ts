import type { Pendapatan } from "../entity";
import type {
  CreateRequest,
  ItemResponse,
  PendapatanSearchRequest,
  SearchRequest,
  SearchResponse,
  UpdateRequest
} from "../model";

export interface IRepository <T>{
  find(id: string): ItemResponse<T>
  search(request: SearchRequest): SearchResponse<T>
  create(request: CreateRequest<T>): ItemResponse<T>
  update(id: string, request: UpdateRequest<T>): ItemResponse<T>
  delete(id: string, force: boolean): ItemResponse<T>
}

export interface IPendapatanRepository extends IRepository<Pendapatan>{
  search(request: PendapatanSearchRequest): SearchResponse<Pendapatan>
}
