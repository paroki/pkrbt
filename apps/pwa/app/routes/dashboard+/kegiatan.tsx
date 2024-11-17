import { defer, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import KegiatanList from "~/pkg/kegiatan/components/KegiatanList";
import { listKegiatanByUser } from "~/pkg/kegiatan/actions.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const kegiatan = listKegiatanByUser(request);
  return defer({ kegiatan });
}

export default function Page() {
  const { kegiatan } = useLoaderData<typeof loader>();
  return <KegiatanList kegiatan={kegiatan} />;
}
