import { CoreError } from "@/error";

export type APIResponse<T> = {
  data: T;
};

export type PagerMeta = {
  page: number;
  size: number;
  total: number;
  pageTotal: number;
  firstPage: string;
  previousPage: string;
  nextPage: string;
  lastPage: string;
};

export type PagedResponse<T> = APIResponse<T> & {
  data: T[];
  pager: PagerMeta;
};

export type RequestError = CoreError | undefined;
