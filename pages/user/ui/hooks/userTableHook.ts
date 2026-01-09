import type { PaginationState, SortingState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useFetcher, type FetcherWithComponents } from "react-router";
import { config } from "shared/config";
import type { User, UserSearch, UserSort } from "shared/types";

export function useUserTableHook(initialSort: SortingState = []) {
  const [sorting, setSorting] = useState<SortingState>(initialSort);
  const [data, setData] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState<PaginationState>(
    config.ui.dataTable.pagination.initialState,
  );
  const [keyword, setKeyword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const fetcher = useFetcher();

  function fetchData() {
    let sorts: UserSort = {};
    sorting.map((val) => {
      const dir = val.desc ? "desc" : "asc";
      if (val.id === "name") {
        sorts.name = dir;
      }
      if (val.id === "email") {
        sorts.email = dir;
      }
    });

    const offset = pagination.pageIndex * pagination.pageSize;
    const payload: UserSearch = {
      keyword,
      sorts,
      limit: pagination.pageSize,
      offset,
    };
    fetcher.submit(JSON.stringify(payload), {
      method: "POST",
      encType: "application/json",
    });
  }

  useEffect(() => {
    setPagination(config.ui.dataTable.pagination.initialState);
  }, [sorting]);

  useEffect(() => {
    setPagination(config.ui.dataTable.pagination.initialState);
  }, [keyword]);

  useEffect(() => {
    fetchData();
  }, [pagination, keyword, sorting]);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setData(fetcher.data.users);
      setTotal(fetcher.data.total);
    }
    setLoading(fetcher.state !== "idle");
  }, [fetcher]);

  return {
    data,
    setData,
    sorting,
    setSorting,
    total,
    setTotal,
    pagination,
    setPagination,
    keyword,
    setKeyword,
    loading,
  };
}
