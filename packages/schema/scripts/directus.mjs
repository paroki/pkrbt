import {
  authentication,
  createDirectus as sdkCreateDirectus,
} from "@directus/sdk";
import { Directus } from "@pkrbt/directus";
import dotenv from "dotenv";

let directus;

dotenv.config();

const url = process.env.DIRECTUS_URL;
const email = process.env.DIRECTUS_ADMIN_EMAIL;
const password = process.env.DIRECTUS_ADMIN_PASSWORD;
const staticToken = process.env.DIRECTUS_SEED_TOKEN;
export async function createDirectus() {
  if (!directus) {
    let token = staticToken;
    if (!token) {
      const client = sdkCreateDirectus(url).with(authentication("json"));
      const { access_token } = await client.login(email, password);
      token = access_token;
    }

    directus = new Directus({
      baseUrl: url,
      token,
      clientOptions: {
        globals: {
          logger: {
            info: console.log,
            error: console.error,
            log: console.log,
            warn: console.warn,
          },
        },
      },
    });
  }

  return directus;
}
