import { Directus } from "@pkrbt/directus-core";
import { post } from "./post";
import { Schema } from "..";
import { page } from "./page";
import { category } from "./category";

export * from "./types";

export function website(directus: Directus<Schema>) {
  return {
    post: {
      ...post(directus),
    },
    page: {
      ...page(directus),
    },
    category: {
      ...category(directus),
    },
  };
}
