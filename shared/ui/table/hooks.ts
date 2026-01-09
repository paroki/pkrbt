import { type PaginationState, type SortingState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { config } from "shared/config";

export function useDataTableHook<TData>(initialSort: SortingState = []) {
  const [sorting, setSorting] = useState<SortingState>(initialSort);
  const [pagination, setPagination] = useState<PaginationState>(
    config.ui.dataTable.pagination.initialState,
  );
  const [keyword, setKeyword] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TData[]>([]);
  const [total, setTotal] = useState(0);

  const fetcher = useFetcher();

  useEffect(() => {
    setPagination(config.ui.dataTable.pagination.initialState);
  }, [sorting]);

  useEffect(() => {
    setPagination(config.ui.dataTable.pagination.initialState);
  }, [keyword]);

  useEffect(() => {
    let sorts = new Map<string, string>();
    sorting.map((val) => {
      const dir = val.desc ? "desc" : "asc";
      sorts.set(val.id, dir);
    });

    const offset = pagination.pageIndex * pagination.pageSize;
    const payload = {
      keyword,
      sorts: Object.fromEntries(sorts),
      limit: pagination.pageSize,
      offset,
    };
    fetcher.submit(JSON.stringify(payload), {
      method: "POST",
      encType: "application/json",
    });
  }, [pagination, keyword, sorting]);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setData(fetcher.data.items);
      setTotal(fetcher.data.total);
    }
    setLoading(fetcher.state !== "idle");
  }, [fetcher]);

  return {
    sorting,
    setSorting,
    pagination,
    setPagination,
    keyword,
    setKeyword,
    loading,
    data,
    setData,
    total,
  };
}
