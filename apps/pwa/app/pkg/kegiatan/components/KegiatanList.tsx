import { KegiatanR } from "@pkrbt/directus";
import { Await } from "@remix-run/react";
import { Suspense } from "react";
import { cn } from "~/common/utils";
import Loading from "~/components/Loading";
import Stacked from "./Stacked";
import CreateFloat from "~/components/buttons/CreateFloat";

function KegiatanItems({ items }: { items: KegiatanR[] }) {
  return (
    <div className="flex flex-col w-full h-full">
      <div className={cn("flex flex-row flex-wrap", "items-stretch gap-2")}>
        {items.map((item) => (
          <Stacked key={item.id} kegiatan={item} />
        ))}
      </div>
      <div className="flex flex-grow"></div>
      <div className="flex flex-row w-full fixed bottom-0 left-0 p-4 items-center justify-center">
        <div className="flex flex-row max-w-sm">
          <CreateFloat to="/kegiatan/create" />
        </div>
      </div>
    </div>
  );
}

export default function List({ data }: { data: Promise<KegiatanR[]> }) {
  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={data}>{(data) => <KegiatanItems items={data} />}</Await>
    </Suspense>
  );
}
