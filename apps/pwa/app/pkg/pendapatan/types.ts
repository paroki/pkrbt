import { SumberPendapatanR } from "@pkrbt/directus";

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
