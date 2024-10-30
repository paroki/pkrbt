import { Directus } from "@pkrbt/directus-core";
import { restMethods, Schema, User } from "..";
import { Query, readItem, readItems } from "@directus/sdk";

export * from "./types";

export function user(directus: Directus<Schema>) {
  return {
    user: {
      ...restMethods(directus, "user"),
      async search(query: Query<Schema, User>) {
        let error;
        let items;
        try {
          items = await directus.rest.request(readItems("user", query));
        } catch (e) {
          error = e as Error;
        }

        return { error, items };
      },
      async read(id: string, query: Query<Schema, User>) {
        let error: Error | undefined;
        let item;

        try {
          item = await directus.rest.request(readItem("user", id, query));
        } catch (e) {
          error = e as Error;
        }

        return { item, error };
      },
    },
  };
}
