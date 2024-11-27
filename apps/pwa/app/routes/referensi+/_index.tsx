import { json } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import { ensureRequestGranted } from "~/pkg/auth/auth.server";
import Referensi from "~/pkg/referensi/pages/Referensi";

export async function loader({ request }: LoaderFunctionArgs) {
  await ensureRequestGranted(request, "admin");
  return json({});
}

export default function Page() {
  return <Referensi />;
}
