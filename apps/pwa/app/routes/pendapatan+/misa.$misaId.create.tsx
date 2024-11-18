import { MisaR, PendapatanR } from "@pkrbt/directus";
import { defer } from "@remix-pwa/sw";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { fetchMisaById } from "~/pkg/misa/misa.server";
import MisaCreate from "~/pkg/pendapatan/components/MisaCreate";
import { createPendapatan } from "~/pkg/pendapatan/pendapatan.server";

export type LoaderType = {
  misa: Promise<MisaR>;
};

export async function action({ request }: ActionFunctionArgs) {
  return await createPendapatan(request);
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.misaId, "Misa tidak ditemukan");

  const misa = fetchMisaById(request, params.misaId);
  return defer({ misa });
}

export default function Page() {
  const { misa } = useLoaderData<LoaderType>();
  const data = useActionData<typeof action>();
  let created: PendapatanR;

  if (data) {
    created = data.pendapatan as PendapatanR;
  }
  return <MisaCreate misa={misa} created={created} />;
}
