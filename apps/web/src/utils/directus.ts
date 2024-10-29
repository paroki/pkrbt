import { Directus } from "@pkrbt/directus";
import { DIRECTUS_URL } from "./config";

export const directus = new Directus({
  baseUrl: DIRECTUS_URL,
  token: process.env.DIRECTUS_TOKEN,
});
