import { LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { ensureRequestGranted } from "~/pkg/auth/auth.server";
import { deleteLingkungan } from "~/pkg/referensi/lingkungan.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  await ensureRequestGranted(request, "admin");
  invariant(params.id, "Unknown lingkungan to process");

  return await deleteLingkungan(request, params.id);
}
