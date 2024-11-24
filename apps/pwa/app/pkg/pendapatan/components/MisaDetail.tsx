"use client";
import { Await, useFetcher, useNavigate } from "@remix-run/react";
import { Suspense, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/shadcn/card";
import MisaSkeleton from "./MisaSkeleton";
import { MisaR } from "@pkrbt/directus";
import { cn, toMoney } from "~/common/utils";
import { Separator } from "~/components/shadcn/separator";
import { sortPendapatan, sumTotalPendapatan } from "../utils";
import { toastRemoved } from "~/common/toaster";
import RemoveButton from "~/components/buttons/RemoveButton";
import BackButton from "~/components/buttons/BackButton";
import CreateButton from "~/components/buttons/CreateButton";
import IconButton from "~/components/buttons/IconButton";

type Props = {
  misa: Promise<MisaR>;
};

function MisaCard({ misa }: { misa: MisaR }) {
  const [deleting, setDeleting] = useState(false);
  const fetcher = useFetcher();
  const navigate = useNavigate();

  function onDelete() {
    const url = `/pendapatan/misa/${misa.id}/delete`;
    fetcher.load(url);
  }

  useEffect(() => {
    if (fetcher.state === "loading") {
      setDeleting(true);
    }
  }, [fetcher.state]);

  useEffect(() => {
    if (fetcher.state === "idle" && deleting) {
      toastRemoved();
      setDeleting(false);
      navigate("/pendapatan/misa");
    }
  }, [deleting, fetcher.state, navigate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{misa.perayaan}</CardTitle>
        <CardDescription></CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className={cn("flex flex-col grow basis-1")}>
          {sortPendapatan(misa.pendapatan).map((item) => (
            <div
              key={item.id}
              className={cn("flex flex-row border-b items-center gap-x-2 py-2")}
            >
              <IconButton
                actionUrl={`/pendapatan/${item.id}`}
                iconStyle={"edit"}
                policy="Bendahara"
              />
              <div className="w-36">{item.sumber.sumber}</div>
              <span className="w-24 text-right">
                {toMoney(item.jumlah ?? 0)}
              </span>
            </div>
          ))}
          <div className="flex flex-row font-semibold gap-x-2">
            <IconButton
              actionUrl={`/pendapatan`}
              iconStyle={"edit"}
              className="invisible"
              policy="PengurusHarian"
            />
            <span className="w-36">Total</span>
            <span className="w-24 text-right items-end">
              {toMoney(sumTotalPendapatan(misa.pendapatan))}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-x-2">
        <RemoveButton onDelete={onDelete} policy="Bendahara" />
        <CreateButton
          createUrl={`/pendapatan/misa/${misa.id}/create`}
          policy="Bendahara"
        />
        <BackButton to="/pendapatan/misa" label="Kembali" />
      </CardFooter>
    </Card>
  );
}
export default function MisaDetail({ misa }: Props) {
  return (
    <Suspense fallback={<MisaSkeleton />}>
      <Await resolve={misa}>
        {(misa) => (
          <>{misa ? <MisaCard misa={misa} /> : <div>Not Found</div>}</>
        )}
      </Await>
    </Suspense>
  );
}
