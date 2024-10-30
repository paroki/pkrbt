import { Directus } from "@pkrbt/directus";
import { DIRECTUS_TOKEN_NAME, DIRECTUS_URL } from "./config";
import { cookies } from "next/headers";

export function createDirectus() {
  const token = cookies().get(DIRECTUS_TOKEN_NAME)?.value;
  return new Directus({
    baseUrl: DIRECTUS_URL,
    token,
  });
}
