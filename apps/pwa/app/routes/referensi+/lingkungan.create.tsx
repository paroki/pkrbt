import { ActionFunctionArgs } from "@remix-run/node";
import { ensureRequestGranted } from "~/pkg/auth/auth.server";
import LingkunganForm from "~/pkg/referensi/components/LingkunganForm";
import { createLingkungan } from "~/pkg/referensi/lingkungan.server";

export async function action({ request }: ActionFunctionArgs) {
  await ensureRequestGranted(request, "admin");

  return await createLingkungan(request);
}

export default function Page() {
  return <LingkunganForm />;
}
