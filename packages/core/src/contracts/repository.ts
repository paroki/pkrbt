import type { Pendapatan } from "../entity";
import type {
  CreateRequest,
  ItemResponse,
  PendapatanSearchRequest,
  SearchRequest,
  SearchResponse,
  UpdateRequest,
} from "../model";

/**
 * Base for all repository interface
 */
export interface IRepository<T> {
  find(id: string): ItemResponse<T>;
  search(request: SearchRequest): SearchResponse<T>;
  create(request: CreateRequest<T>): ItemResponse<T>;
  update(id: string, request: UpdateRequest<T>): ItemResponse<T>;
  delete(id: string, force: boolean): ItemResponse<T>;
}

/**
 * Represent pendapatan repository
 */
export interface IPendapatanRepository extends IRepository<Pendapatan> {
  search(request: PendapatanSearchRequest): SearchResponse<Pendapatan>;
}
