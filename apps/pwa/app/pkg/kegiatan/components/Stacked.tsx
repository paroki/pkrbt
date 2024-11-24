import { KegiatanR } from "@pkrbt/directus";
import { Link } from "@remix-run/react";
import { cn, toHuman, toLocalDate } from "~/common/utils";
import RoleBadge from "~/components/badges/RoleBadge";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "~/components/shadcn/avatar";
import { useStorage } from "~/pkg/storage/hooks";

export default function Stacked({ kegiatan }: { kegiatan: KegiatanR }) {
  const { assetUrl } = useStorage();

  return (
    <Link to={`/kegiatan/${kegiatan.id}`}>
      <div
        className={cn(
          "flex flex-row max-w-sm grow basis-1",
          "p-4 gap-4",
          "bg-white rounded-md drop-shadow-md",
          "hover:bg-slate-100",
        )}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <Avatar className="h-16 w-16">
            {kegiatan.createdBy.avatar && (
              <AvatarImage
                src={assetUrl(kegiatan.createdBy.avatar.id)}
                alt="@avatar"
              />
            )}
            <AvatarFallback>N/A</AvatarFallback>
          </Avatar>
          <RoleBadge
            user={kegiatan.createdBy != null ? kegiatan.createdBy : undefined}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <span className="text-xs font-semibold">
              {toLocalDate(kegiatan.tanggal, "dddd, DD MMMM YYYY")}
            </span>
          </div>
          <span className="font-bold text-blue-800">
            {kegiatan.namaKegiatan}
          </span>
          <span className="text-xs">{kegiatan.jenisPelaksana}</span>
          <span className="text-xs text-gray-500">
            oleh {kegiatan.createdBy && kegiatan.createdBy?.nama} pada{" "}
            {toHuman(kegiatan.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}
