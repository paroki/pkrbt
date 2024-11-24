import { json } from "@remix-pwa/sw";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { ensureRequestGranted } from "~/pkg/auth/auth.server";
import KegiatanForm from "~/pkg/kegiatan/components/KegiatanForm";
import { createKegiatan } from "~/pkg/kegiatan/kegiatan.server";

export async function action({ request }: ActionFunctionArgs) {
  await ensureRequestGranted(request, "organisator");
  return await createKegiatan(request);
}
export async function loader({ request }: LoaderFunctionArgs) {
  await ensureRequestGranted(request, "organisator");
  return json({});
}

export default function Page() {
  return <KegiatanForm />;
}
