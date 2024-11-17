"use client";
import { Await, Link } from "@remix-run/react";
import { Dispatch, SetStateAction, Suspense, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/shadcn/card";
import MisaSkeleton from "./MisaSkeleton";
import { MisaR, PendapatanR } from "@pkrbt/directus";
import { cn, isGranted, toMoney } from "~/common/utils";
import { useRootOutletContext } from "~/hooks/outlets";
import { Separator } from "~/components/shadcn/separator";
import { sortPendapatan, sumTotalPendapatan } from "../utils";
import { Button } from "~/components/shadcn/button";
import { LucideFilePlus, LucideSearch, SkipBackIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/shadcn/dialog";
import PendapatanForm, { Intent } from "./PendapatanForm";
import ConfirmDialog from "~/components/confirm";

type Props = {
  misa: Promise<MisaR>;
};

function MisaDialog({
  dialogOpen,
  setDialogOpen,
  pendapatan,
  misa,
  intent = "update",
}: {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  pendapatan?: PendapatanR;
  misa: MisaR;
  intent: Intent;
}) {
  function onFormSubmitted() {
    setDialogOpen(false);
    pendapatan = undefined;
  }
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {intent === "update"
              ? `Update data ${pendapatan?.sumber.sumber}`
              : "Menambah data Pendapatan"}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {intent === "update"
              ? `Edit data ${pendapatan?.sumber.sumber} pada ${misa.perayaan}`
              : `Menambah data pendapatan pada ${misa.perayaan}`}
          </DialogDescription>
        </DialogHeader>
        <div>
          <PendapatanForm
            onFormSubmitted={onFormSubmitted}
            pendapatan={pendapatan}
            intent={intent}
            misa={misa}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function MisaCard({ misa }: { misa: MisaR }) {
  const { user, userPolicies } = useRootOutletContext();
  const [intent, setIntent] = useState<Intent>("update");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendapatan, setPendapatan] = useState<PendapatanR | undefined>(
    undefined,
  );

  const isBendaharaDPP = isGranted(user.policies, [userPolicies.bendaharaDPP]);

  function editPendapatan(item: PendapatanR, intent: Intent) {
    setIntent(intent);
    setPendapatan(item);
    setDialogOpen(true);
  }

  function addPendapatan() {
    setPendapatan(undefined);
    setIntent("create");
    setDialogOpen(true);
  }

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
                <Button
                  size={"icon"}
                  onClick={() => editPendapatan(item, "update")}
                >
                  <LucideSearch />
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
            <span className="w-24">Total</span>
            <span className="w-36 text-right">
              {toMoney(sumTotalPendapatan(misa.pendapatan))}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-x-2">
        <Button asChild>
          <Link to="/pendapatan/misa">
            <SkipBackIcon />
            Kembali
          </Link>
        </Button>
        <Button onClick={() => addPendapatan()}>
          <LucideFilePlus />
          Tambah
        </Button>
        <ConfirmDialog
          intent="delete"
          confirmLink={`/pendapatan/misa/${misa.id}/delete`}
          title="Apakah anda yakin?"
          description="Aksi ini tidak dapat di batalkan!"
        >
          <div>
            <p>
              Apakah anda yakin ingin menghapus data misa{" "}
              <span className="text-red-500 font-bold">{misa.perayaan}</span>
            </p>
          </div>
        </ConfirmDialog>
        <MisaDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          pendapatan={pendapatan}
          misa={misa}
          intent={intent}
        />
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
