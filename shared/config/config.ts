import type { PaginationState } from "@tanstack/react-table";

export const config = {
  ui: {
    dataTable: {
      pagination: {
        initialState: {
          pageIndex: 0,
          pageSize: 10,
        } satisfies PaginationState,
      },
    },
  },
};
