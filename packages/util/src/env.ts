import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import z from "zod";
import singleton from "./singleton";

export enum EnumEnv {
  production = "production",
  development = "developement",
  test = "test",
}

const envSchema = z.object({
  NODE_ENV: z.enum(EnumEnv).optional().default(EnumEnv.development),
  PKRBT_API_URL: z.url(),
  PKRBT_DATABASE_URL: z.url(),
  PKRBT_AUTH_SECRET: z.string(),
  PKRBT_AUTH_COOKIE_PREFIX: z.string().default("pkrbt"),
  PKRBT_ADMIN_NAME: z.string(),
  PKRBT_ADMIN_EMAIL: z.string(),
  PKRBT_ADMIN_PASSWORD: z.string(),
  PKRBT_DB_PAGE_SIZE: z.coerce.number().default(10)
});

function createEnv() {
  const env: EnumEnv = (process.env.NODE_ENV as EnumEnv) ?? EnumEnv.development;
  if (env != EnumEnv.production) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const dir = path.resolve(__dirname, "../../../");
    dotenv.config({
      path: [`${dir}/.env`],
      override: false,
      debug: true,
      encoding: "utf-8",
    });
  }

  return envSchema.parse(process.env);
}

export const env = singleton("env", () => createEnv());
