import { Directus } from "@pkrbt/directus-core";
import { post } from "./post";
import { Schema } from "../schema";
import { page } from "./page";

export function website(directus: Directus<Schema>) {
  return {
    post: {
      ...post(directus),
    },
    page: {
      ...page(directus),
    },
  };
}
