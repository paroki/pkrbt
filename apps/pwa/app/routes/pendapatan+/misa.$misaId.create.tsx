import { MisaR } from "@pkrbt/directus";
import { defer } from "@remix-pwa/sw";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { ensureUserPolicy } from "~/pkg/auth/auth.server";
import { fetchMisaById } from "~/pkg/misa/misa.server";
import MisaCreate from "~/pkg/pendapatan/components/MisaCreate";
import { createPendapatan } from "~/pkg/pendapatan/pendapatan.server";

export type LoaderType = {
  misa: Promise<MisaR>;
};

export async function action({ request }: ActionFunctionArgs) {
  await ensureUserPolicy(request, "Bendahara");
  return await createPendapatan(request);
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  await ensureUserPolicy(request, "Bendahara");
  invariant(params.misaId, "Misa tidak ditemukan");

  const misa = fetchMisaById(request, params.misaId);
  return defer({ misa });
}

export default function Page() {
  const { misa } = useLoaderData<LoaderType>();
  return <MisaCreate misa={misa} />;
}
