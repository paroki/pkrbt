import { json } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteMisa } from "~/pkg/misa/misa.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const id = params.id;

  invariant(id, "Data Misa tidak ditemukan");

  await deleteMisa(request, params.id as string);

  return json({ success: true });
}
