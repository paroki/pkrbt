import { PendapatanR } from "@pkrbt/directus";
import { defer } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";
import ErrorLayout from "~/components/layout/error";
import HarianEditForm from "~/pkg/pendapatan/components/HarianEditForm";
import {
  fetchPendapatan,
  updatePendapatan,
} from "~/pkg/pendapatan/pendapatan.server";

export type LoaderType = {
  item: Promise<PendapatanR>;
};

export async function action({ request }: LoaderFunctionArgs) {
  try {
    return await updatePendapatan(request);
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));
    throw new Response("Gagal menyimpan data.", {
      status: 500,
      statusText: "Error",
    });
  }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  if (!params.id) {
    return new Response("Pendapatan tidak ditemukan", {
      status: 404,
      statusText: "Data Tidak Ditemukan!",
    });
  }
  const item = fetchPendapatan(request, params.id);
  return defer({ item });
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="flex">
      <ErrorLayout title="Pendapatan Tidak Ditemukan" type="route">
        <p>Data Pendapatan yang ingin anda edit tidak ditemukan</p>
      </ErrorLayout>
    </div>
  );
}

export default function Page() {
  const { item } = useLoaderData<LoaderType>();
  return <HarianEditForm pendapatan={item} />;
}
