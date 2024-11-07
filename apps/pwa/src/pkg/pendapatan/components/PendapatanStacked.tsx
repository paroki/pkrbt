import { PendapatanR } from "@pkrbt/directus";
import moment from "moment";

type Props = {
  item: PendapatanR;
};

export default function PendapatanStacked({ item }: Props) {
  const tanggal = moment(item.tanggal, "YYYY-MM-DD");
  return (
    <div className="flex flex-row rounded-lg border border-slate-400 p-2 gap-4 align-middle">
      <div className="flex flex-col content-center text-center text-md">
        <span className="border-b bg-red-400 rounded-t-sm p-2">
          {tanggal.format("D")}
        </span>
        <span className="p-2 rounded-b-sm border">{tanggal.format("MMM")}</span>
      </div>
      <div className="flex flex-col">
        <span>{item.sumber.sumber}</span>
        <span>{item.uraian}</span>
      </div>
      <div className="flex">
        <span>{item.jumlah}</span>
      </div>
    </div>
  );
}
