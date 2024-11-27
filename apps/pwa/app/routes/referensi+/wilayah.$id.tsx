import { WilayahR } from "@pkrbt/directus";
import { json } from "@remix-pwa/sw";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { ensureRequestGranted } from "~/pkg/auth/auth.server";
import WilayahForm from "~/pkg/referensi/components/WilayahForm";
import { readWilayah, updateWilayah } from "~/pkg/referensi/wilayah.server";

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.id, "Unknown wilayah to process");
  await ensureRequestGranted(request, "admin");

  return await updateWilayah(request, params.id);
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.id, "Unknown wilayah to process");
  await ensureRequestGranted(request, "admin");

  const item = await readWilayah(request, params.id);
  return json(item);
}

export default function Page() {
  const data = useLoaderData() as WilayahR;
  return <WilayahForm wilayah={data} />;
}
