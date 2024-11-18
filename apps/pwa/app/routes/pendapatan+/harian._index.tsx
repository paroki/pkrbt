import { PendapatanR } from "@pkrbt/directus";
import { defer } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import Loading from "~/components/Loading";

import HarianList from "~/pkg/pendapatan/components/HarianList";
import { fetchHarianList } from "~/pkg/pendapatan/pendapatan.server";

type LoaderType = {
  items: Promise<PendapatanR[]>;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const items = fetchHarianList(request);
  return defer({ items });
}

export default function Page() {
  const { items } = useLoaderData<LoaderType>();
  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={items}>{(items) => <HarianList items={items} />}</Await>
    </Suspense>
  );
}
