import { LingkunganR } from "@pkrbt/directus";
import { json } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { readLingkunganItems } from "~/pkg/referensi/actions.server";
import LingkunganList from "~/pkg/referensi/pages/LingkunganList";

export async function loader({ request }: LoaderFunctionArgs) {
  const items = await readLingkunganItems(request);

  return json(items);
}

export default function Page() {
  const items = useLoaderData() as LingkunganR[];
  return <LingkunganList items={items} />;
}
