import {
  Directus as DirectusCore,
  DirectusOptions,
} from "@pkrbt/directus-core";
import { website } from "./website";
import { Schema } from "./schema";
import { organisasi } from "./organisasi";

export const Directus = DirectusCore.plugin(website, organisasi);
export type Directus = InstanceType<typeof Directus<Schema>>;

export function createDirectus(options: DirectusOptions) {
  return new Directus<Schema>(options);
}
