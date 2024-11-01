import { Directus } from "@pkrbt/directus-core";
import { Query, readItems } from "@directus/sdk";
import { restMethods, Schema } from "..";
import { Imam } from "./types";

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
  };
}
