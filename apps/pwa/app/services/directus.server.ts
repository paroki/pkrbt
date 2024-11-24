import {
  createDirectus as baseCreateDirectus,
  rest,
  staticToken,
} from "@directus/sdk";
import { Directus, Schema } from "@pkrbt/directus";
import { getAuthenticatedUser } from "~/services/auth.server";
import { DIRECTUS_URL } from "~/services/config.server";

export class DirectusError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    console.log(JSON.stringify(options, null, 2));
  }
}

export async function sdkCreateClient(request: Request) {
  const user = await getAuthenticatedUser(request);
  const directus = baseCreateDirectus<Schema>(DIRECTUS_URL)
    .with(staticToken(user.token))
    .with(rest());
  return directus;
}
export default async function createDirectus(request: Request) {
  const user = await getAuthenticatedUser(request);
  const directus = new Directus({
    baseUrl: DIRECTUS_URL,
    token: user.token,
  });

  return directus;
}
