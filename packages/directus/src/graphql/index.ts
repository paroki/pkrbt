import { Directus } from "@pkrbt/directus-core";
import { Schema } from "../schema";
import { Graphql } from "./graphql";
import { GraphqlOptions } from "./types";

export function createGraphql(
  directus: Directus<Schema>,
  options: Omit<GraphqlOptions, "directus"> &
    Pick<Partial<GraphqlOptions>, "directus">,
) {
  const withDefaults: GraphqlOptions = {
    directus,
    ...options,
  };
  return new Graphql(withDefaults);
}

export * from "./graphql";
export * from "./types";
