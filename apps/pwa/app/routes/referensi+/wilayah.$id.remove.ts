import { LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { ensureRequestGranted } from "~/pkg/auth/auth.server";
import { deleteWilayah } from "~/pkg/referensi/wilayah.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  await ensureRequestGranted(request, "admin");
  invariant(params.id, "unknown wilayah to process");

  return await deleteWilayah(request, params.id);
}
