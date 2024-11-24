import { ActionFunctionArgs } from "@remix-run/node";
import { ensureRequestGranted } from "~/pkg/auth/auth.server";

import { createJenisKegiatan } from "~/pkg/kegiatan/kegiatan.server";

export async function action({ request }: ActionFunctionArgs) {
  await ensureRequestGranted(request, "organisator");
  return await createJenisKegiatan(request);
}
