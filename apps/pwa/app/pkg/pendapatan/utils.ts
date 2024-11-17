import { PendapatanR, SumberPendapatanR } from "@pkrbt/directus";
import { useEffect, useState } from "react";
import localforage from "localforage";
import { ReportItem, SumberPendapatanMap } from "./types";

export function sumTotalPendapatan(pendapatan: PendapatanR[]) {
  let total = 0;
  pendapatan.map((item) => {
    total += item.jumlah ?? 0;
  });

  return total;
}

export const sumberPendapatanCacheKey = "sumber-pendapatan";

export function useSumberPendapatanList() {
  const [items, setItems] = useState<SumberPendapatanR[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      let cached = await localforage.getItem<typeof items>(
        sumberPendapatanCacheKey,
      );

      if (!cached || cached.length < 1) {
        const response = await fetch("/pendapatan/sumber", {
          headers: {
            Accept: "application/json",
          },
        });
        const data = await response.json();
        cached = data.sumberList as SumberPendapatanR[];
        if (cached.length > 0) {
          await localforage.setItem(sumberPendapatanCacheKey, cached);
        }
      }

      if (cached.length > 0) {
        setItems(cached);
      }

      setLoading(false);
    }
    if (items.length < 1) {
      fetchItems();
    }
  }, [items, loading]);

  return items ?? [];
}

export function sortPendapatan(pendapatan: PendapatanR[]) {
  const sorted: PendapatanR[] = [];

  pendapatan.map((item) => {
    const index = item.sumber.sort - 1;

    sorted[index] = item;
  });
  return sorted;
}

export function sortReport(report: ReportItem[]) {
  const sorted: ReportItem[] = [];

  report.map((item) => {
    const index = item.sort - 1;
    sorted[index] = item;
  });

  return sorted;
}

export function sumReports(reports: ReportItem[]) {
  let total = 0;
  reports.map((item) => {
    total += Number(item.jumlah);
  });

  return total;
}

export function generateSumberPendapatanMap(sumberList: SumberPendapatanR[]) {
  const data: SumberPendapatanMap = {};

  sumberList.map((item) => {
    data[item.id] = item;
  });

  return data;
}
