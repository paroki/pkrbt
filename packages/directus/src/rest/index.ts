import { Directus } from "@pkrbt/directus-core";
import { Schema } from "..";
import {
  createItem,
  deleteItem,
  Query,
  readItem,
  readItems,
  updateItem,
} from "@directus/sdk";
import {
  RestFiltersParams,
  RestFindIdType,
  RestItemPartial,
  RestResponse,
} from "./types";

export function restMethods<T>(
  directus: Directus<Schema>,
  collection: keyof Schema,
) {
  const rest = directus.rest;

  return {
    async search(query?: Query<Schema, T>) {
      let error;
      let items;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const q = query as unknown as any;
        items = await directus.rest.request(readItems(collection, q));
      } catch (e) {
        error = e as Error;
      }

      return { error, items: items as T[] };
    },

    /**
     * Search item id
     */
    async findId(params: RestFiltersParams): Promise<RestFindIdType> {
      let id;
      let error;

      try {
        const items = await rest.request(
          readItems(collection, {
            ...params,
            limit: 1,
            fields: ["id"],
          }),
        );
        id = items[0]?.id;
      } catch (e) {
        error = e as Error;
      }

      return { id, error };
    },

    async create(item: RestItemPartial): Promise<RestResponse<T>> {
      let error = undefined;
      let data = undefined;
      try {
        data = await rest.request(createItem(collection, item));
      } catch (e) {
        error = e as Error;
      }

      return { item: data as T, error };
    },

    async read(id: string | number, query?: Query<Schema, T>) {
      let item;
      let error;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const q = query as unknown as any;
        item = await rest.request(readItem(collection, id, q));
      } catch (e) {
        error = e as Error;
      }

      return { item: item as T, error };
    },

    async update(
      id: string | number,
      item: RestItemPartial,
    ): Promise<RestResponse<T>> {
      let error = undefined;
      let data = undefined;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const i = item as unknown as any;
        data = await rest.request(updateItem(collection, id, i));
      } catch (e) {
        error = e as Error;
      }

      return { item: data as T, error };
    },

    async remove(id: string): Promise<{ error?: Error }> {
      let error = undefined;

      try {
        await rest.request(deleteItem(collection, id));
      } catch (e) {
        error = e as Error;
      }

      return { error };
    },
  };
}
