import { Directus } from "@pkrbt/directus-core";
import { post } from "./post";
import { Schema } from "../schema";

export function website(directus: Directus<Schema>) {
  return {
    post: {
      ...post(directus),
    },
  };
}
