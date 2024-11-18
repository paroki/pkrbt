import { Await } from "@remix-run/react";
import { Suspense } from "react";
import Loading from "~/components/Loading";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/shadcn/card";
import { LoaderType } from "~/routes/pendapatan+/misa.$misaId.create";
import PendapatanForm from "./PendapatanForm";
import { MisaR } from "@pkrbt/directus";

function CreateForm({ misa }: { misa: MisaR }) {
  const initial = {
    uraian: misa.perayaan,
    tanggal: misa.tanggal ?? undefined,
    misa: {
      id: misa.id,
    },
    jumlah: undefined,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pendapatan: {misa.perayaan}</CardTitle>
      </CardHeader>
      <CardContent>
        <PendapatanForm pendapatan={initial} misa={misa} intent="create" />
      </CardContent>
    </Card>
  );
}

export default function MisaCreate({ misa }: { misa: LoaderType["misa"] }) {
  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={misa}>
        {(misa) => {
          return <CreateForm misa={misa} />;
        }}
      </Await>
    </Suspense>
  );
}
