import { Directus } from "@pkrbt/directus-core";
import { Schema } from "../schema";
import { GraphqlError } from "./error";

export type GraphqlParamType =
  | "Int"
  | "String"
  | "[String!]!"
  | "!Int"
  | "!String";

export type GraphqlParam = {
  name: string;
  type: GraphqlParamType;
  required: boolean;
  variableName: string;
  argumentName: string;
};

export type GraphqlFragment = {
  name: string;
  content: string;
};

export type GraphqlExecParams = {
  [key: string]: unknown;
};

export type GraphqlPaginateParams = {
  page: number;
  limit: number;
  sort?: string[];
  [key: string]: unknown;
};

export type GraphqlPaginateMeta = {
  page: number;
  pageSize: number;
  rows: number;
  nextPage: number;
  previousPage: number;
};

export type GraphqlExecResponse<T> = {
  data?: T;
  error?: GraphqlError;
};

export type GraphqlPaginateResponse<T> = {
  items: T[];
  meta?: GraphqlPaginateMeta;
  error?: GraphqlError | Error;
};

export type GraphqlOptions = {
  directus: Directus<Schema>;
  type: string;
  fields: string;
  fragment?: GraphqlFragment;
};
