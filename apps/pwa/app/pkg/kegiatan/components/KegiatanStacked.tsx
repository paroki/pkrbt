import { KegiatanR } from "@pkrbt/directus";
import { Link } from "@remix-run/react";
import { CalendarClockIcon } from "lucide-react";
import moment from "moment";
import { Button } from "~/components/shadcn/button";

type Props = {
  kegiatan: KegiatanR[];
};

function KegiatanRow({ kegiatan }: { kegiatan: KegiatanR }) {
  const tanggal = moment(kegiatan.tanggal);

  return (
    <div className="flex flex-row gap-x-2 min-w-[200px]">
      <div className="flex-col w-16 h-16 border rounded-md top-0">
        <div className="bg-black h-6 rounded-t-md text-white text-center p-1 text-sm">
          <span>{tanggal.format("MMM")}</span>
        </div>
        <div className="flex items-center justify-center">
          <div className="h-10 content-center">{tanggal.format("D")}</div>
        </div>
      </div>
      <div className="flex flex-col gap-y-1">
        <span className="text-sm font-semibold">
          {kegiatan.pelaksana.singkatan ?? kegiatan.pelaksana.nama}
        </span>
        <span className="text-sm lg:text-balance">{kegiatan.namaKegiatan}</span>
        <span className="text-sm lg:text-balance">
          Jenis: {kegiatan.jenisKegiatan.jenisKegiatan}
        </span>
        <div>
          <Button asChild size={"sm"} variant={"secondary"}>
            <Link to="/kegiatan/edit">
              <CalendarClockIcon />
              Tambah ke kalender
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function KegiatanStacked({ kegiatan }: Props) {
  return (
    <div className="flex flex-col gap-y-2">
      {kegiatan.map((item) => (
        <div
          key={item.id}
          className="flex bg-white border rounded-sm drop-shadow-md p-2"
        >
          <KegiatanRow kegiatan={item} />
        </div>
      ))}
    </div>
  );
}
