import { Directus } from "@pkrbt/directus-core";
import { restMethods, Schema } from "..";
import { Lingkungan, Wilayah } from "./types";

export * from "./types";

export function wilayah(directus: Directus<Schema>) {
  return {
    lingkungan: {
      ...restMethods<Lingkungan>(directus, "lingkungan"),
    },
    wilayah: {
      ...restMethods<Wilayah>(directus, "wilayah"),
    },
  };
}
