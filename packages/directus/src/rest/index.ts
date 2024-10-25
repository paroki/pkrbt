import { Directus } from "@pkrbt/directus-core";
import { Schema } from "..";
import { createItem, deleteItem, readItems, updateItem } from "@directus/sdk";
import {
  RestFiltersParams,
  RestFindIdType,
  RestItemPartial,
  RestResponse,
} from "./types";
import invariant from "tiny-invariant";

export function restMethods<T>(
  directus: Directus<Schema>,
  collection: keyof Schema,
) {
  const rest = directus.rest;

  /**
   * Search item id
   */
  async function findId(params: RestFiltersParams): Promise<RestFindIdType> {
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
  }

  async function create(item: RestItemPartial): Promise<RestResponse<T>> {
    let error = undefined;
    let data = undefined;
    try {
      data = await rest.request(createItem(collection, item));
    } catch (e) {
      error = e as Error;
    }

    return { item: data as T, error };
  }

  async function update(item: RestItemPartial): Promise<RestResponse<T>> {
    let error = undefined;
    let data = undefined;
    try {
      invariant(item.id, "id undefined");
      data = await rest.request(updateItem(collection, item.id, item));
    } catch (e) {
      error = e as Error;
    }

    return { item: data as T, error };
  }

  async function remove(id: string): Promise<{ error?: Error }> {
    let error = undefined;

    try {
      await rest.request(deleteItem(collection, id));
    } catch (e) {
      error = e as Error;
    }

    return { error };
  }

  return {
    findId,
    create,
    update,
    remove,
  };
}
