import { ImageType, components } from "..";

type schema = components["schemas"];

export type Organisasi = Omit<schema["ItemsOrganisasi"], "nama"> &
  Pick<Required<schema["ItemsOrganisasi"]>, "nama">;

export type OrganisasiR = Omit<Organisasi, "id" | "nama"> &
  Pick<Required<Organisasi>, "nama" | "id">;

export type StrukturOrganisasi = Omit<
  schema["ItemsOrganisasiStruktur"],
  "nama" | "organisasi"
> &
  Pick<Required<schema["ItemsOrganisasiStruktur"]>, "nama" | "organisasi">;

export type PeriodeJabatan = Omit<schema["ItemsOrganisasiPeriode"], "periode"> &
  Pick<Required<schema["ItemsOrganisasiPeriode"]>, "periode" | "dimulaiPada">;

export type AnggotaOrganisasi = Omit<
  schema["ItemsOrganisasiAnggota"],
  "nama" | "aktif" | "foto"
> &
  Pick<Required<schema["ItemsOrganisasiAnggota"]>, "nama" | "aktif"> & {
    foto?: ImageType;
  };

export type JabatanOrganisasi = Omit<
  schema["ItemsOrganisasiJabatan"],
  "nama" | "aktif" | "struktur" | "periode" | "penjabat"
> &
  Pick<Required<schema["ItemsOrganisasiJabatan"]>, "nama" | "aktif"> & {
    penjabat: AnggotaOrganisasi;
    struktur: StrukturOrganisasi;
  };
