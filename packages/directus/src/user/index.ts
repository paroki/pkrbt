import { Directus } from "@pkrbt/directus-core";
import { restMethods, Schema, User } from "..";
import {
  DirectusUser,
  Query,
  readItem,
  readItems,
  updateUser,
} from "@directus/sdk";

export * from "./types";

export type UserUpdatePayload = Pick<
  User,
  "nama" | "tempatLahir" | "tanggalLahir"
>;

export function user(directus: Directus<Schema>) {
  const rest = directus.rest;

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
      async update(id: string, item: DirectusUser) {
        let error = undefined;
        let data = undefined;
        try {
          data = (await rest.request(updateUser(id, item))) as DirectusUser;
        } catch (e) {
          error = e as Error;
        }

        return { item: data, error };
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
