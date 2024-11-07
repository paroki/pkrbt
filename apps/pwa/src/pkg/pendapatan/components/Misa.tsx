"use server";

import { MisaR } from "@pkrbt/directus";
import { listMisa, pendapatanByTanggal } from "../actions";
import { formatMoney } from "@/common/utils";
import { Button } from "@pkrbt/ui/shadcn/button";
import { FileEditIcon } from "lucide-react";
import Link from "next/link";

async function MisaItem({ item }: { item: MisaR }) {
  if (!item.tanggal) {
    return "No data";
  }
  const pendapatan = await pendapatanByTanggal(item.tanggal);

  if (!pendapatan) {
    return "No Data";
  }

  return (
    <div className="flex flex-row">
      <div className="flex flex-col border p-4 rounded-md shadow-md w-full">
        <div className="flex flex-row gap-4">
          <span className="content-center">
            {item.tanggal} - {item.perayaan}
          </span>
          <Link href={`/paroki/pendapatan/misa/${item.id}`}>
            <Button size={"icon"}>
              <FileEditIcon />
            </Button>
          </Link>
        </div>
        <div className="flex flex-col text-sm">
          {pendapatan.map((pItem) => (
            <div key={pItem.id} className="flex flex-row">
              <div className="w-24">{pItem.sumber.sumber}</div>
              <div className="w-24 text-right">{formatMoney(pItem.jumlah)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function Misa({}) {
  const items = await listMisa();

  if (!items) {
    return <div>Tidak Ditemukan</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <MisaItem item={item} key={item.id} />
      ))}
    </div>
  );
}
