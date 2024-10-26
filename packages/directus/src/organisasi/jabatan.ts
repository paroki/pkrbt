import { Directus } from "@pkrbt/directus-core";
import { JabatanOrganisasi, Schema } from "..";
import { readItems, Query } from "@directus/sdk";

export function jabatan(directus: Directus<Schema>) {
  return {
    search: async (query: Query<Schema, JabatanOrganisasi>) => {
      let error;
      let items;
      try {
        items = (await directus.rest.request(
          readItems("organisasi_jabatan", query),
        )) as JabatanOrganisasi[] | undefined;
      } catch (e) {
        error = e as Error;
      }

      return { error, items };
    },
  };
}
