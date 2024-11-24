import { Directus } from "@pkrbt/directus-core";
import { restMethods, Schema, User, UserR, UserP } from "..";
import {
  DirectusUser,
  Query,
  readItems,
  readUser,
  updateUser,
} from "@directus/sdk";

export * from "./types";

export type UserUpdatePayload = Partial<User>;

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

        return { error, items: items as unknown as UserR[] };
      },
      async update(
        id: string,
        item: Partial<UserP>,
        query?: Query<Schema, User>,
      ) {
        let error = undefined;
        let data = undefined;
        try {
          const payload = item as unknown as DirectusUser;
          const q = query as unknown as Query<Schema, DirectusUser>;
          data = (await rest.request(
            updateUser(id, payload, q),
          )) as unknown as User;
        } catch (e) {
          error = e as Error;
        }

        return { item: data as UserR, error };
      },
      async read(id: string, query: Query<Schema, User>) {
        let error: Error | undefined;
        let item;

        try {
          const q = query as unknown as Query<Schema, DirectusUser>;
          item = (await directus.rest.request(
            readUser(id, q),
          )) as unknown as UserR;
        } catch (e) {
          error = e as Error;
        }

        return { item, error };
      },
    },
  };
}
