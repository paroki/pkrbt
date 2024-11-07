import { formatMoney } from "@/common/utils";
import { misaById, pendapatanByTanggal } from "../actions";
import { sumPendapatan } from "../utils";
import { Button } from "@pkrbt/ui/shadcn/button";
import { FileEditIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export default async function MisaDetailPage({ params }: Props) {
  const misa = await misaById(params.id);
  if (!misa) {
    return "No Data";
  }

  const pendapatan = await pendapatanByTanggal(misa.tanggal as string);

  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <h3 className="text-lg font-bold">{misa.perayaan}</h3>
        <span className="text-sm">{misa.tanggal}</span>
      </div>
      <div className="flex flex-col gap-y-4">
        {pendapatan && (
          <div className="flex flex-row">
            <span className="w-24 font-bold">Total</span>
            <span className="w-24 text-right font-bold">
              {formatMoney(sumPendapatan(pendapatan))}
            </span>
          </div>
        )}
        {pendapatan ? (
          pendapatan.map((pItem) => (
            <div
              key={pItem.id}
              className="flex flex-row content-center items-center border-b gap-x-2 p-2"
            >
              <Link href={`/paroki/pendapatan/${pItem.id}`}>
                <Button size={"icon"} className="bg-green-600">
                  <FileEditIcon />
                </Button>
              </Link>

              <div className="w-28">{pItem.sumber.sumber}</div>
              <div className="w-28 text-right">{formatMoney(pItem.jumlah)}</div>
            </div>
          ))
        ) : (
          <span>Belum ada Data</span>
        )}
      </div>
    </div>
  );
}
