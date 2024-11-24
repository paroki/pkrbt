import { json } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import { listOrganisasi } from "~/pkg/organisasi/actions.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const items = await listOrganisasi(request);

  return json(items);
}
