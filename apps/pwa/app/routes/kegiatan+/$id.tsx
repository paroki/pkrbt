import { json } from "@remix-pwa/sw";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { readKegiatan, updateKegiatan } from "~/pkg/kegiatan/kegiatan.server";
import KegiatanEdit from "~/pkg/kegiatan/pages/KegiatanEdit";

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.id, "Unknown data to update");
  return await updateKegiatan(request, params.id);
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  if (!params.id)
    throw new Response("Not Found", { status: 404, statusText: "Not Found" });

  const kegiatan = await readKegiatan(request, params.id);
  return json({ kegiatan });
}

export default function Page() {
  return <KegiatanEdit />;
}
