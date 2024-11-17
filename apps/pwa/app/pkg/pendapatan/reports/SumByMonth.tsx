import {
  ReportItem,
  SumByMonth as SumByMonthType,
} from "~/pkg/pendapatan/types";
import { cn, toLocalDate, toMoney } from "~/common/utils";
import { sortReport, sumReports } from "../utils";
import { Separator } from "~/components/shadcn/separator";
import { useEffect, useState } from "react";

function MonthlyDetail({
  bulan,
  reports,
}: {
  bulan: string;
  reports: ReportItem[];
}) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(sumReports(reports));
  }, [reports]);

  return (
    <div
      className={cn(
        "flex flex-col items-stretch px-4 py-2",
        "bg-white border rounded-md drop-shadow-md",
      )}
    >
      <span className="font-bold">
        {toLocalDate(`2024-${bulan}-01`, "MMMM")}
      </span>
      <Separator className="mb-2" />
      <div className="flex flex-col gap-y-2">
        {sortReport(reports).map((item, index) => (
          <div
            key={index}
            className={cn("flex flex-row border-b border-b-slate-300")}
          >
            <span className="flex-1 min-w-24">{item.sumber}</span>
            <span className="min-w-24 text-right">{toMoney(item.jumlah)}</span>
          </div>
        ))}
        <div className={cn("flex flex-row")}>
          <span className="flex-1 font-semibold">Total</span>
          <span className="min-w-24 text-right font-semibold border-y-2 border-blue-900">
            {toMoney(total)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SumByMonth({ report }: { report: SumByMonthType }) {
  return (
    <div className="flex flex-row flex-wrap gap-4 items-center justify-center">
      {Object.entries(report.monthly).map((item, index) => {
        const [bulan, reports] = item;
        return <MonthlyDetail key={index} bulan={bulan} reports={reports} />;
      })}
    </div>
  );
}
