import { LoaderFunctionArgs } from "@remix-run/node";
import { Await, defer, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import MisaList from "~/pkg/pendapatan/components/MisaList";
import MisaSkeleton from "~/pkg/pendapatan/components/MisaSkeleton";
import { listByMisa } from "~/pkg/pendapatan/pendapatan.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const pendapatan = listByMisa(request, params);
  return defer({ pendapatan });
}

export default function Page() {
  const { pendapatan } = useLoaderData<typeof loader>();
  return (
    <Suspense fallback={<MisaSkeleton />}>
      <Await resolve={pendapatan}>
        {(pendapatan) => <MisaList items={pendapatan} />}
      </Await>
    </Suspense>
  );
}
