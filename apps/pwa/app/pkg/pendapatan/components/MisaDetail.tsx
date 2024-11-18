"use client";
import { Await, Link, useFetcher, useNavigate } from "@remix-run/react";
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
import { cn, isGranted, toMoney } from "~/common/utils";
import { useRootOutletContext } from "~/hooks/outlets";
import { Separator } from "~/components/shadcn/separator";
import { sortPendapatan, sumTotalPendapatan } from "../utils";
import { Button } from "~/components/shadcn/button";
import { LucideFilePlus, LucideSearch, SkipBackIcon } from "lucide-react";
import ConfirmDialog from "~/components/confirm";
import { toastRemoved } from "~/common/toaster";

type Props = {
  misa: Promise<MisaR>;
};

function MisaCard({ misa }: { misa: MisaR }) {
  const { user, userPolicies } = useRootOutletContext();
  const isBendaharaDPP = isGranted(user.policies, [userPolicies.bendaharaDPP]);
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
        <div className={cn("flex flex-col")}>
          {sortPendapatan(misa.pendapatan).map((item) => (
            <div
              key={item.id}
              className={cn("flex flex-row border-b items-center gap-x-2 py-2")}
            >
              {isBendaharaDPP && (
                <Button size={"icon"} asChild>
                  <Link to={`/pendapatan/${item.id}`}>
                    <LucideSearch />
                  </Link>
                </Button>
              )}
              <div className="w-36">{item.sumber.sumber}</div>
              <span className="w-24 text-right">
                {toMoney(item.jumlah ?? 0)}
              </span>
            </div>
          ))}
          <div className="flex flex-row font-semibold gap-x-2">
            <Button size={"icon"} className="invisible" />
            <span className="w-36">Total</span>
            <span className="w-24 text-right">
              {toMoney(sumTotalPendapatan(misa.pendapatan))}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-x-2">
        <Button asChild size={"sm"}>
          <Link to="/pendapatan/misa">
            <SkipBackIcon />
            Kembali
          </Link>
        </Button>
        <Button asChild size={"sm"}>
          <Link to={`/pendapatan/misa/${misa.id}/create`}>
            <LucideFilePlus />
            Tambah
          </Link>
        </Button>
        <ConfirmDialog
          title="Apakah anda yakin?"
          description="Aksi ini tidak dapat di batalkan!"
          onDelete={onDelete}
          loading={deleting}
        >
          <div>
            <p>
              Apakah anda yakin ingin menghapus data misa berikut:
              <br />
              <span className="text-red-500 font-bold">{misa.perayaan}</span>
            </p>
          </div>
        </ConfirmDialog>
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
