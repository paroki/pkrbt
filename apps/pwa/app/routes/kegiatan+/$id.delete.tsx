import { LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { ensureRequestGranted } from "~/pkg/auth/auth.server";
import { removeKegiatan } from "~/pkg/kegiatan/kegiatan.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.id, "Unknown kegiatan to delete");
  await ensureRequestGranted(request, "organisator");

  return await removeKegiatan(request, params.id);
}
