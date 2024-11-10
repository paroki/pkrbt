export * from "./types";
import { Directus } from "@pkrbt/directus-core";
import {
  AnggotaOrganisasi,
  JabatanOrganisasi,
  Organisasi,
  OrganisasiR,
  PeriodeJabatan,
  restMethods,
  Schema,
  StrukturOrganisasi,
} from "..";
import { jabatan } from "./jabatan";
import { Query, readItems } from "@directus/sdk";

export function organisasi(directus: Directus<Schema>) {
  return {
    organisasi: {
      ...restMethods<Organisasi>(directus, "organisasi"),
      async search(query: Query<Schema, Organisasi>) {
        let error;
        let items: OrganisasiR[] = [];
        try {
          items = (await directus.rest.request(
            readItems("organisasi", query),
          )) as OrganisasiR[];
        } catch (e) {
          error = e as Error;
        }

        return { error, items };
      },
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
