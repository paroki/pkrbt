import { json } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import { readLingkunganItems } from "~/pkg/referensi/actions.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const items = await readLingkunganItems(request);

  return json(items);
}
