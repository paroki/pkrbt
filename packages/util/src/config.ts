import z, { size } from "zod";
import { env } from "./env";
import singleton from "./singleton";

export const configSchema = z.object({
  api: z.object({
    url: z.string(),
    port: z.coerce.number(),
  }),
  auth: z.object({
    secret: z.string(),
    cookiePrefix: z.string(),
  }),
  database: z.object({
    url: z.string(),
    pageSize: z.number().default(10),
  }),
});

export type Config = z.infer<typeof configSchema>;

export const config = singleton("config", () => {
  const apiUrl = new URL(env.PKRBT_API_URL);
  const c = configSchema.parse({
    api: {
      url: env.PKRBT_API_URL,
      port: apiUrl.port,
    },
    auth: {
      secret: env.PKRBT_AUTH_SECRET,
      cookiePrefix: env.PKRBT_AUTH_COOKIE_PREFIX,
    },
    database: {
      url: env.PKRBT_DATABASE_URL,
      size: env.PKRBT_DB_PAGE_SIZE,
    },
  });
  return c;
});
