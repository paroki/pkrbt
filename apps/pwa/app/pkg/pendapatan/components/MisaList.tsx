import { MisaR } from "@pkrbt/directus";
import { Link } from "@remix-run/react";
import { LucidePlusCircle, LucideSearch } from "lucide-react";
import { cn, toLocalDate, toMoney } from "~/common/utils";
import { sortPendapatan } from "../utils";
import { Button } from "~/components/shadcn/button";

type Props = {
  items: MisaR[];
};

function MisaDetail({ misa }: { misa: MisaR }) {
  let total = 0;
  misa.pendapatan.map((item) => {
    total += item.jumlah ?? 0;
  });

  return (
    <div className="flex-1 w-full flex-col h-full">
      <div className={cn("flex flex-row text-sm mb-2 gap-x-2", "border-b")}>
        <div className="flex flex-col items-start justify-center">
          <span className="text-xs">
            {toLocalDate(misa.tanggal, "dddd, DD MMMM YYYY")}
          </span>
          <span className="font-bold">{misa.perayaan}</span>
        </div>
        <div>
          <Link
            to={`/pendapatan/misa/${misa.id}`}
            className={cn("flex text-xs items-center gap-x-2")}
          >
            <LucideSearch />
          </Link>
        </div>
      </div>
      <div className="flex flex-col text-sm">
        {sortPendapatan(misa.pendapatan).map((pendapatan, index) => (
          <div
            key={index}
            className="flex flex-row border-b items-center gap-x-2"
          >
            <span className="w-32">{pendapatan.sumber.sumber}</span>
            <span className="w-20 text-right">
              {pendapatan.jumlah && toMoney(pendapatan.jumlah)}
            </span>
          </div>
        ))}
        <div
          className={cn(
            "flex flex-row items-center gap-x-2",
            "font-semibold text-blue-800",
          )}
        >
          <span className="w-32">Total</span>
          <span
            className={cn(
              "w-20 text-right",
              "border-green-700 border-t border-b border-y-2",
            )}
          >
            {toMoney(total)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function MisaList({ items }: Props) {
  return (
    <div className="flex flex-col min-h-full">
      <div className="flex flex-wrap gap-x-4 gap-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "p-4 flex-1",
              "bg-white border rounded-md drop-shadow-md",
            )}
          >
            <MisaDetail key={item.id} misa={item} />
          </div>
        ))}
      </div>
      <div
        className={cn(
          "sticky bottom-0 right-0 z-50 bg-white flex w-full mt-4",
          "items-center justify-center",
          "border rounded-t-md shadow-inner-sm",
        )}
      >
        <div className="flex min-w-96 py-2 px-4">
          <Button size={"sm"} asChild>
            <Link to="/pendapatan/misa/create">
              <LucidePlusCircle />
              Tambah Data
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
