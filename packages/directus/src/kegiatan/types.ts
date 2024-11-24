import {
  ImageType,
  LingkunganR,
  OrganisasiR,
  StrukturOrganisasiR,
  UserR,
  WilayahR,
} from "..";
import { components } from "..";

type schema = components["schemas"];

export type JenisKegiatan = Omit<
  schema["ItemsJenisKegiatan"],
  "id" | "jenisKegiatan"
> & {
  id?: string;
  jenisKegiatan: string;
};

export type JenisKegiatanR = Omit<JenisKegiatan, "id" | "jenisKegiatan"> &
  Pick<Required<JenisKegiatan>, "id" | "jenisKegiatan">;

export type Kegiatan = Omit<
  schema["ItemsKegiatan"],
  | "pelaksana"
  | "subPelaksana"
  | "jenisKegiatan"
  | "tanggal"
  | "wilayah"
  | "lingkungan"
  | "organisasi"
  | "cover"
  | "createdBy"
> & {
  jenisKegiatan?: JenisKegiatan;
  tanggal?: string;
  wilayah?: WilayahR;
  lingkungan?: LingkunganR;
  organisasi?: OrganisasiR;
  organisasiStruktur?: StrukturOrganisasiR;
  createdBy?: UserR;
  cover?: ImageType;
};

export type KegiatanR = Omit<
  Kegiatan,
  | "id"
  | "jenisKegiatan"
  | "tanggal"
  | "pelaksana"
  | "jenisKegiatan"
  | "createdBy"
> &
  Pick<
    Required<Kegiatan>,
    "id" | "jenisKegiatan" | "jenisPelaksana" | "tanggal" | "createdBy"
  >;
