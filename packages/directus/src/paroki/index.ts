import { Directus } from "@pkrbt/directus-core";
import { Query, readItems } from "@directus/sdk";
import { restMethods, Schema } from "..";
import {
  Imam,
  Misa,
  MisaR,
  Pendapatan,
  PendapatanR,
  SumberPendapatan,
  SumberPendapatanR,
} from "./types";

export * from "./types";

export default function paroki(directus: Directus<Schema>) {
  return {
    imam: {
      ...restMethods(directus, "imam"),
      async search(
        query: Query<Schema, Imam>,
      ): Promise<{ items?: Imam[]; error?: Error }> {
        let error;
        let items;
        try {
          items = await directus.rest.request(readItems("imam", query));
        } catch (e) {
          error = e as Error;
        }

        return { error, items };
      },
    },
    sumberPendapatan: {
      ...restMethods(directus, "sumber_pendapatan"),
      async search(query?: Query<Schema, SumberPendapatan>) {
        let error;
        let items;
        try {
          items = (await directus.rest.request(
            readItems("sumber_pendapatan", query),
          )) as unknown as SumberPendapatanR[];
        } catch (e) {
          error = e as Error;
        }

        return { error, items };
      },
    },
    pendapatan: {
      ...restMethods(directus, "pendapatan"),
      async search(query?: Query<Schema, Pendapatan>) {
        let error;
        let items;

        try {
          const data = await directus.rest.request(
            readItems("pendapatan", query),
          );
          items = data as unknown as PendapatanR[];
        } catch (e) {
          error = e as Error;
        }

        return { error, items };
      },
    },
    misa: {
      ...restMethods(directus, "misa"),
      async search(query?: Query<Schema, Misa>) {
        let error;
        let items;
        try {
          const data = await directus.rest.request(readItems("misa", query));
          items = data as MisaR[];
        } catch (e) {
          error = e as Error;
        }

        return { error, items };
      },
    },
  };
}
