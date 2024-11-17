import { KegiatanR } from "@pkrbt/directus";
import { Await } from "@remix-run/react";
import { Suspense } from "react";
import KegiatanStacked from "./KegiatanStacked";
import KegiatanSkeleton from "./KegiatanSkeleton";

export default function KegiatanList({
  kegiatan,
}: {
  kegiatan: Promise<KegiatanR[]>;
}) {
  return (
    <Suspense fallback={<KegiatanSkeleton />}>
      <Await resolve={kegiatan}>
        {(kegiatan) => <KegiatanStacked kegiatan={kegiatan} />}
      </Await>
    </Suspense>
  );
}
