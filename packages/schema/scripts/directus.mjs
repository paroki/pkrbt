import { Directus } from "@pkrbt/directus";
import dotenv from "dotenv";

let directus;

dotenv.config();

export function createDirectus() {
  if (!directus) {
    directus = new Directus({
      baseUrl: process.env.DIRECTUS_URL,
      token: process.env.DIRECTUS_TOKEN,
    });
  }

  return directus;
}
