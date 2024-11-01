import { Directus } from "@pkrbt/directus";
import { DIRECTUS_URL } from "./config";
import { getSessionToken } from "./auth";

export async function createDirectus() {
  const token = await getSessionToken();
  return new Directus({
    baseUrl: DIRECTUS_URL,
    token,
  });
}
