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
    <div
      key={misa.id}
      className={cn(
        "flex items-stretch bg-white gap-y-2 -mx-4",
        "border rounded-sm drop-shadow-sm p-2",
      )}
    >
      <div className="flex-1">
        <div className="block overflow-hidden h-full">
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
      </div>
    </div>
  );
}

export default function MisaList({ items }: Props) {
  return (
    <div className={cn("container mx-auto p-4 space-y-4")}>
      <Button asChild size={"sm"}>
        <Link to="/pendapatan/misa/create">
          <LucidePlusCircle />
          Data Baru
        </Link>
      </Button>
      {items.map((item) => (
        <MisaDetail key={item.id} misa={item} />
      ))}
    </div>
  );
}
