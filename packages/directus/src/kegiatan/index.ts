import { Directus } from "@pkrbt/directus-core";
import { Schema } from "../schema";
import { restMethods } from "../rest";
import { JenisKegiatan, Kegiatan, KegiatanR } from "./types";
import { Query, readItems } from "@directus/sdk";

export * from "./types";

export default function kegiatan(directus: Directus<Schema>) {
  return {
    jenisKegiatan: {
      ...restMethods<JenisKegiatan>(directus, "jenis_kegiatan"),
    },
    kegiatan: {
      ...restMethods<Kegiatan>(directus, "kegiatan"),
      async search(query: Query<Schema, Kegiatan> = {}) {
        let error;
        let items;
        try {
          items = (await directus.rest.request(
            readItems("kegiatan", query),
          )) as KegiatanR[];
        } catch (e) {
          error = e as Error;
        }
        return { error, items };
      },
    },
  };
}
