import { KegiatanR } from "@pkrbt/directus";
import { Link } from "@remix-run/react";
import { cn, toHuman, toLocalDate, toTime } from "~/common/utils";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "~/components/shadcn/avatar";
import { useStorage } from "~/pkg/storage/hooks";

export default function Stacked({ kegiatan }: { kegiatan: KegiatanR }) {
  const { assetUrl, thumbsUrl } = useStorage();
  return (
    <div
      className={cn(
        "flex flex-row p-2 w-full h-full max-w-sm",
        "gap-x-2",
        "bg-white rounded-md border drop-shadow-md",
      )}
    >
      {kegiatan.cover && (
        <div className="flex max-w-24 h-full flex-row">
          <img
            src={thumbsUrl(kegiatan.cover.id)}
            alt="@cover"
            className="rounded-sm"
          />
        </div>
      )}

      <Link
        to={`/kegiatan/${kegiatan.id}`}
        className="flex flex-col items-start gap-y-1"
      >
        <div className="flex flex-col">
          <span className="font-bold text-blue-800">
            {kegiatan.namaKegiatan}
          </span>
          <span className="text-sm font-semibold">
            {toLocalDate(kegiatan.tanggal, "dddd, DD MMMM YYYY")}
          </span>
          <span className="text-sm font-semibold">
            {toTime(kegiatan.dimulaiPada)}
            {kegiatan.berakhirPada
              ? ` - ${toTime(kegiatan.berakhirPada)}`
              : "- selesai"}
          </span>

          <span className="text-xs">
            {kegiatan.jenisPelaksana === "organisasi"
              ? kegiatan.organisasi?.nama
              : kegiatan.wilayah?.nama}
          </span>
        </div>
        <div className="flex flex-row items-center justify-center gap-x-1">
          <Avatar className="w-8 h-8">
            {kegiatan.createdBy.avatar && (
              <AvatarImage src={assetUrl(kegiatan.createdBy.avatar.id)} />
            )}
            <AvatarFallback>N/A</AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-500">
            oleh {kegiatan.createdBy && kegiatan.createdBy?.nama} pada{" "}
            {toHuman(kegiatan.createdAt)}
          </span>
        </div>
      </Link>
    </div>
  );
}
