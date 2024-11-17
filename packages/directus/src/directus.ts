import {
  Directus as DirectusCore,
  DirectusOptions,
} from "@pkrbt/directus-core";
import { website } from "./website";
import { Schema, user } from ".";
import { organisasi } from "./organisasi";
import paroki from "./paroki";
import kegiatan from "./kegiatan";

export const Directus = DirectusCore.plugin(
  website,
  organisasi,
  user,
  paroki,
  kegiatan,
);
export type Directus = InstanceType<typeof Directus<Schema>>;

export function createDirectus(options: DirectusOptions) {
  return new Directus<Schema>(options);
}
