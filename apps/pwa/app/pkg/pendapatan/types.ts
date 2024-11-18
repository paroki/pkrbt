import { MisaR, SumberPendapatanR } from "@pkrbt/directus";

export type MisaPendapatanSearchResponse = {
  items: MisaR[];
  page: number;
  rows: number;
};

export type SumberPendapatanMap = {
  [key: string]: SumberPendapatanR;
};

export type ReportItem = Pick<SumberPendapatanR, "id" | "sumber" | "sort"> & {
  jumlah: number;
};

export type MonthlyReport = {
  [key: string]: ReportItem[];
};

export type SumByMonth = {
  monthly: MonthlyReport;
};

export type SumPendapatanYearly = Pick<
  SumberPendapatanR,
  "id" | "sort" | "sumber"
> & {
  total: number;
};
