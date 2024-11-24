import { json } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import { readWilayahItems } from "~/pkg/referensi/actions.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const items = await readWilayahItems(request);

  return json(items);
}
