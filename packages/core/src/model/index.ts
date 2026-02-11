import type z from "zod";
import type { BaseError } from "../error";
import type { schema } from "../schema";

/**
 * Common Model
 */
export type SuccessResult<T> = readonly [T, null];
export type ErrorResult<E extends BaseError> = readonly [null, E];
export type Result<T, E extends BaseError> = SuccessResult<T> | ErrorResult<E>;

/**
 * Generics Request/Response
 */
export type CreateRequest<T> = Omit<T, "id">;
export type CreateResponse<T> = Promise<Result<T, BaseError>>;
export type UpdateRequest<T> = Partial<Omit<T, "id">>;
export type UpdateResponse<T> = Promise<Result<T, BaseError>>;
export type DeleteRequest = z.infer<typeof schema.deleteRequest>;
export type DeleteResponse<T> = Promise<Result<T, BaseError>>;
export type SearchRequest = {
  page?: number;
  size?: number;
};
export type SearchResponse<T> = Promise<
  Result<
    {
      items: T[];
      total: number;
    },
    BaseError
  >
>;
export type ItemResponse<T> = Promise<Result<T, BaseError>>;
/**
 * Pendapatan Model
 */
export type PendapatanCreateRequest = z.infer<typeof schema.pendapatan.create>;
export type PendapatanUpdateRequest = z.infer<typeof schema.pendapatan.update>;
export type PendapatanDeleteRequest = z.infer<typeof schema.pendapatan.delete>;
export type PendapatanSearchRequest = z.infer<typeof schema.pendapatan.search>;
export type PendapatanCollection = z.infer<typeof schema.pendapatan.collection>;
