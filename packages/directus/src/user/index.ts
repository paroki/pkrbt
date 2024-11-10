import { Directus } from "@pkrbt/directus-core";
import { restMethods, Schema, User } from "..";
import {
  DirectusUser,
  Query,
  readItems,
  readUser,
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
      async update(id: string, item: Partial<User>) {
        let error = undefined;
        let data = undefined;
        try {
          const payload = item as unknown as DirectusUser;
          data = (await rest.request(
            updateUser(id, payload),
          )) as unknown as User;
        } catch (e) {
          error = e as Error;
        }

        return { item: data as User, error };
      },
      async read(id: string, query: Query<Schema, User>) {
        let error: Error | undefined;
        let item;

        try {
          const q = query as unknown as Query<Schema, DirectusUser>;
          item = (await directus.rest.request(
            readUser(id, q),
          )) as unknown as User;
        } catch (e) {
          error = e as Error;
        }

        return { item, error };
      },
    },
  };
}
