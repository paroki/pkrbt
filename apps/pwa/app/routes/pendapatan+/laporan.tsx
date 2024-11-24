import { defer } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import Loading from "~/components/Loading";
import { ensureUserPolicy } from "~/pkg/auth/auth.server";
import { sumByMonth } from "~/pkg/pendapatan/pendapatan.server";
import SumByMonth from "~/pkg/pendapatan/reports/SumByMonth";
import { SumByMonth as SumByMonthType } from "~/pkg/pendapatan/types";

export async function loader({ request }: LoaderFunctionArgs) {
  await ensureUserPolicy(request, "PengurusHarian");
  try {
    const report = await sumByMonth(request);
    return defer({ ...report });
  } catch (e) {
    return defer({});
  }
}

export default function Page() {
  const data = useLoaderData<SumByMonthType>();
  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={data}>
        {(data) => {
          return <SumByMonth report={data} />;
        }}
      </Await>
    </Suspense>
  );
}
