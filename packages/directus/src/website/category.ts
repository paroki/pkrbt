import { createItem, deleteItem, readItems } from "@directus/sdk";
import { DirectusCore as Directus } from "../core";
import { Category } from "../types";

/* eslint no-unused-vars: 0 */
export type CategoryType = {
  search: (keyword: string) => Promise<Category[]>;
  create: (item: Category) => Promise<Category>;
  remove: (id: string) => Promise<void>;
};

export function category(directus: Directus): CategoryType {
  async function create(item: Category) {
    return directus.rest.request(createItem("category", item));
  }

  async function remove(id: string) {
    await directus.rest.request(deleteItem("category", id));
  }

  async function search(keyword: string) {
    return await directus.rest.request(
      readItems("category", {
        search: keyword,
      }),
    );
  }

  return {
    search,
    create,
    remove,
  };
}
