import type { UserWithRole } from "better-auth/plugins";
import type { SortDirection } from "./query";

export type User = UserWithRole;

type UserFields = "name" | "email";

export type UserSort = {
  name?: SortDirection;
  email?: SortDirection;
  role?: SortDirection;
};

export type UserFilter = {
  searchField?: UserFields;
  searchOperator?: "contains" | "starts_with" | "ends_with";
  searchValue?: string;
};

export type UserSearch = {
  keyword?: string;
  sorts?: UserSort;
  limit?: number;
  offset?: number;
  filter?: UserFilter;
};
