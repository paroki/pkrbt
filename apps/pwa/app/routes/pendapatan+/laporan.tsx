import { json } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import { ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import localforage from "localforage";
import { sumByMonth } from "~/pkg/pendapatan/pendapatan.server";
import SumByMonth from "~/pkg/pendapatan/reports/SumByMonth";
import { SumByMonth as SumByMonthType } from "~/pkg/pendapatan/types";

export async function loader({ request }: LoaderFunctionArgs) {
  const report = await sumByMonth(request);
  return json({ ...report });
}

export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
  const reportKey = "pendapatan-report";
  async function loadReport() {
    let report = await localforage.getItem(reportKey);
    if (!report) {
      report = await serverLoader();
      // await localforage.setItem(reportKey, report);
    }
    return report as SumByMonthType;
  }

  const report = await loadReport();
  return { ...report };
}

export default function Page() {
  const data = useLoaderData<SumByMonthType>();

  return (
    <div>
      <SumByMonth report={data} />
    </div>
  );
}
