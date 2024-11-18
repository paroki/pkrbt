import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/shadcn/card";
import PendapatanForm from "./PendapatanForm";
import { LoaderType } from "~/routes/pendapatan+/$id";
import { Suspense } from "react";
import Loading from "~/components/Loading";
import { Await, useNavigate } from "@remix-run/react";

export default function HarianEditForm({
  pendapatan,
}: {
  pendapatan: LoaderType["item"];
}) {
  const navigate = useNavigate();
  function onBackClick() {
    navigate("/pendapatan/harian", { replace: true });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Pendapatan</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Loading />}>
          <Await resolve={pendapatan}>
            {(pendapatan) => {
              return (
                <PendapatanForm
                  pendapatan={pendapatan}
                  intent="update"
                  onBackClick={onBackClick}
                />
              );
            }}
          </Await>
        </Suspense>
      </CardContent>
    </Card>
  );
}
