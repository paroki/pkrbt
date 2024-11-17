import { Organisasi, StrukturOrganisasi } from "..";
import { components } from "..";

type schema = components["schemas"];

export type JenisKegiatan = Omit<
  schema["ItemsJenisKegiatan"],
  "id" | "createdBy" | "updatedBy" | "jenisKegiatan"
> & {
  id?: string;
  jenisKegiatan: string;
};

export type Kegiatan = Omit<
  schema["ItemsKegiatan"],
  "pelaksana" | "subPelaksana" | "jenisKegiatan" | "tanggal"
> & {
  pelaksana?: Organisasi;
  subPelaksana?: StrukturOrganisasi;
  jenisKegiatan?: JenisKegiatan;
  tanggal?: string;
};

export type KegiatanR = Omit<
  Kegiatan,
  "id" | "jenisKegiatan" | "tanggal" | "pelaksana" | "jenisKegiatan"
> &
  Pick<Required<Kegiatan>, "id" | "jenisKegiatan" | "pelaksana" | "tanggal">;
