export type SortDirection = "asc" | "desc";

export type GetArrayElementType<T extends readonly unknown[]> =
  T extends readonly (infer U)[] ? U : never;

export type colors = "red" | "green" | "blue" | "orange";
export type PermissionAction =
  | "create"
  | "update"
  | "delete"
  | "read"
  | "share";
