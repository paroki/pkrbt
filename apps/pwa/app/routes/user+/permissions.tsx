import { json } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getUserPermissions } from "~/services/user.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const permissions = await getUserPermissions(request);

  return json(permissions);
}
