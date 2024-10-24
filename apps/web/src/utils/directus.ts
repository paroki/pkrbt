import { Directus } from "@pkrbt/directus";

export const directus = new Directus({
  baseUrl: process.env.DIRECTUS_URL as string,
  token: process.env.DIRECTUS_TOKEN,
});
