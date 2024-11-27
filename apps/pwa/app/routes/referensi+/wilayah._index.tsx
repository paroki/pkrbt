import { WilayahR } from "@pkrbt/directus";
import { json } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { readWilayahItems } from "~/pkg/referensi/actions.server";
import WilayahList from "~/pkg/referensi/pages/WilayahList";

export async function loader({ request }: LoaderFunctionArgs) {
  const items = await readWilayahItems(request);

  return json(items);
}

export default function Page() {
  const data = useLoaderData();
  return <WilayahList items={data as WilayahR[]} />;
}
