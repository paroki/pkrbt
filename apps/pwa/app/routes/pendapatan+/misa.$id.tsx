import { MisaR, SumberPendapatanR } from "@pkrbt/directus";
import { defer } from "@remix-pwa/sw";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
  return await updatePendapatan(request);
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const misa = readMisaById(request, params);
  return defer({ misa });
}

export default function Page() {
  const { misa } = useLoaderData<LoaderType>();
  return <MisaDetail misa={misa} />;
}
