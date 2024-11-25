import { json } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import RootContextOutlet from "~/components/RootContextOutlet";
import { getAuthenticatedUser } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getAuthenticatedUser(request);
  return json({ user });
}

export default function User() {
  return <RootContextOutlet />;
}
