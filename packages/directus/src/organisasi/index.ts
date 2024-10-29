export * from "./types";
import { Directus } from "@pkrbt/directus-core";
import {
  AnggotaOrganisasi,
  JabatanOrganisasi,
  Organisasi,
  PeriodeJabatan,
  restMethods,
  Schema,
  StrukturOrganisasi,
} from "..";
import { jabatan } from "./jabatan";

export function organisasi(directus: Directus<Schema>) {
  return {
    organisasi: {
      ...restMethods<Organisasi>(directus, "organisasi"),
      struktur: {
        ...restMethods<StrukturOrganisasi>(directus, "organisasi_struktur"),
      },
      jabatan: {
        ...restMethods<JabatanOrganisasi>(directus, "organisasi_jabatan"),
        ...jabatan(directus),
      },
      periode: {
        ...restMethods<PeriodeJabatan>(directus, "organisasi_jabatan_periode"),
      },
      anggota: {
        ...restMethods<AnggotaOrganisasi>(directus, "organisasi_anggota"),
      },
    },
  };
}
