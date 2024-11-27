import { KegiatanR } from "@pkrbt/directus";
import { defer } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ensureRequestGranted } from "~/pkg/auth/auth.server";
import List from "~/pkg/kegiatan/components/KegiatanList";
import { listKegiatan } from "~/pkg/kegiatan/kegiatan.server";

type LoaderType = {
  kegiatan: Promise<KegiatanR[]>;
};

export async function loader({ request }: LoaderFunctionArgs) {
  await ensureRequestGranted(request, "organisator");
  const kegiatan = listKegiatan(request);
  return defer({ kegiatan });
}

export default function Page() {
  const { kegiatan } = useLoaderData<LoaderType>();
  return <List data={kegiatan} />;
}
