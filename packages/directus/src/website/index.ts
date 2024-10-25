import { Directus } from "@pkrbt/directus-core";
import { post } from "./post";
import { Schema } from "../schema";
import { page } from "./page";
import { category } from "./category";

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
