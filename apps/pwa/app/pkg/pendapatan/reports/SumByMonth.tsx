import {
  ReportItem,
  SumByMonth as SumByMonthType,
  SumPendapatanYearly,
} from "~/pkg/pendapatan/types";
import { cn, toLocalDate, toMoney } from "~/common/utils";
import { sortReport, sumReports, sumYearlyTotal } from "../utils";
import { Separator } from "~/components/shadcn/separator";
import { useEffect, useState } from "react";
import { SortDirection } from "~/common/types";
import { Tabs, TabsList, TabsTrigger } from "~/components/shadcn/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { SortAscIcon, SortDescIcon, SquareSigmaIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/shadcn/card";
import moment from "moment";

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
        "w-full md:w-auto sm:w-auto",
      )}
    >
      <span className="font-bold">
        {toLocalDate(`2024-${bulan}-01`, "MMMM")}
      </span>
      <Separator className="mb-2" />
      <div className={cn("flex flex-col")}>
        {sortReport(reports).map((item, index) => (
          <div
            key={index}
            className={cn("flex flex-row border-b border-b-slate-300", "mt-2")}
          >
            <span className="flex-1 min-w-24">{item.sumber}</span>
            <span className="min-w-24 text-right">{toMoney(item.jumlah)}</span>
          </div>
        ))}
        <div className={cn("flex flex-row")}>
          <span className="flex-1 font-semibold">Total</span>
          <span className="min-w-24 text-right font-semibold border-y-2 border-green-500">
            {toMoney(total)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function sortMonthlyReport(
  monthy: SumByMonthType["monthly"],
  direction: SortDirection = "desc",
) {
  const sorted: { bulan: string; report: ReportItem[] }[] = [];

  if ("desc" === direction) {
    for (let i = 12; i > 0; i--) {
      const month = String(i + 1);
      if (Object.keys(monthy).includes(month)) {
        sorted.push({ bulan: month, report: monthy[month] });
      }
    }
  } else {
    for (let i = 0; i < 12; i++) {
      const month = String(i + 1);
      if (Object.keys(monthy).includes(month)) {
        const item = { bulan: month, report: monthy[month] };
        sorted.push(item);
      }
    }
  }
  return sorted;
}

export default function SumByMonth({ report }: { report: SumByMonthType }) {
  const initial = sortMonthlyReport(report.monthly, "desc");
  const year = moment(Date.now()).format("YYYY");
  const [sort, setSort] = useState<SortDirection>("desc");
  const [items, setItems] = useState<typeof initial>(initial);
  const [activeTab, setActiveTab] = useState("bulanan");
  const [doSort, setDoSort] = useState<boolean>(true);
  const [yearly, setYearly] = useState<SumPendapatanYearly[]>([]);
  const [yearlyTotal, setYearlyTotal] = useState(0);

  useEffect(() => {
    setItems(sortMonthlyReport(report.monthly, sort));
  }, [report.monthly, sort]);

  useEffect(() => {
    if ("bulanan" !== activeTab) {
      setDoSort(false);
    }
  }, [activeTab]);

  // generate yearly report
  useEffect(() => {
    if (items.length) {
      const x = sumYearlyTotal(items);
      setYearly(x);
    }
  }, [items]);

  // generate yearly total
  useEffect(() => {
    let total = 0;
    yearly.map((item) => {
      total += item.total;
    });
    setYearlyTotal(total);
  }, [yearly]);

  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
      <TabsList
        className={cn(
          "border w-full justify-start items-center mb-4 rounded-md drop-shadow-md",
        )}
      >
        <TabsTrigger
          value="bulanan"
          className="gap-x-2"
          onClick={() => {
            if (!doSort) {
              // the tab just activated don't do the sort
              setDoSort(true);
            } else {
              setSort(sort === "asc" ? "desc" : "asc");
            }
          }}
        >
          {sort === "desc" ? <SortDescIcon /> : <SortAscIcon />}
          Bulanan
        </TabsTrigger>
        <TabsTrigger value="total" className="gap-x-2">
          <SquareSigmaIcon />
          Total
        </TabsTrigger>
      </TabsList>
      <TabsContent value="bulanan">
        <div className={cn("flex flex-row flex-wrap gap-4")}>
          {items.map((item, index) => {
            return (
              <MonthlyDetail
                key={index}
                bulan={item.bulan}
                reports={item.report}
              />
            );
          })}
        </div>
      </TabsContent>
      <TabsContent value="total">
        <Card>
          <CardHeader>
            <CardTitle>Total</CardTitle>
            <CardDescription>
              Rekapitulasi pendapatan tahun {year}
              <Separator className="mt-2" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={cn("flex flex-col w-full")}>
              {yearly.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex flex-row flex-nowrap border-b border-b-slate-300",
                    "items-center align-middle py-2",
                  )}
                >
                  <span className="flex-1 max-w-40">{item.sumber}</span>
                  <span className="flex-1 max-w-40 text-right">
                    {toMoney(item.total)}
                  </span>
                  <span className="flex-grow">&nbsp;</span>
                </div>
              ))}
              <div
                className={cn(
                  "flex flex-row flex-nowrap",
                  "items-center align-middle",
                  "font-bold",
                )}
              >
                <span className="flex-1 max-w-40 ">Total</span>
                <span className="flex-1 max-w-40 text-right border-y-2 border-y-green-600">
                  {toMoney(yearlyTotal)}
                </span>
                <span className="flex-grow">&nbsp;</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
