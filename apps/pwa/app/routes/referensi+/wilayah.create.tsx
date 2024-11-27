import { ActionFunctionArgs } from "@remix-run/node";
import { ensureRequestGranted } from "~/pkg/auth/auth.server";
import WilayahForm from "~/pkg/referensi/components/WilayahForm";
import { createWilayah } from "~/pkg/referensi/wilayah.server";

export async function action({ request }: ActionFunctionArgs) {
  await ensureRequestGranted(request, "admin");

  return await createWilayah(request);
}

export default function Page() {
  return <WilayahForm />;
}
