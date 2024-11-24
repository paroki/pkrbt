import { MisaR, SumberPendapatanR } from "@pkrbt/directus";
import { defer } from "@remix-pwa/sw";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ensureUserPolicy } from "~/pkg/auth/auth.server";
import MisaDetail from "~/pkg/pendapatan/components/MisaDetail";
import {
  readMisaById,
  updatePendapatan,
} from "~/pkg/pendapatan/pendapatan.server";

export type LoaderType = {
  misa: Promise<MisaR>;
  sumberList: Promise<SumberPendapatanR[]>;
};

export async function action({ request }: ActionFunctionArgs) {
  await ensureUserPolicy(request, "Bendahara");
  try {
    return await updatePendapatan(request);
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));
    throw new Response("Sepertinya terjadi kesalahan.", {
      status: 404,
      statusText: "Error",
    });
  }
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  await ensureUserPolicy(request, "PengurusHarian");
  const misa = readMisaById(request, params);
  return defer({ misa });
}

export default function Page() {
  const { misa } = useLoaderData<LoaderType>();
  return <MisaDetail misa={misa} />;
}
