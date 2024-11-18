import { json } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { removePendapatan } from "~/pkg/pendapatan/pendapatan.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  let ref = searchParams.get("ref");

  if (null === ref) {
    ref = "/pendapatan/misa";
  }

  invariant(params.id, "Pendapatan yang ingin dihapus tidak ditemukan!");
  await removePendapatan(request, params.id);

  return json({ success: true });
}
