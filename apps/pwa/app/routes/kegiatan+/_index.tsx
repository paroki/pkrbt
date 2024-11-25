import { defer } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import List from "~/pkg/kegiatan/components/KegiatanList";
import { listKegiatan } from "~/pkg/kegiatan/kegiatan.server";

export function loader({ request }: LoaderFunctionArgs) {
  const kegiatan = listKegiatan(request);
  return defer({ kegiatan });
}

export default function Page() {
  const { kegiatan } = useLoaderData<typeof loader>();
  return <List data={kegiatan} />;
}
