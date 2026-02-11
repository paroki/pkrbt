import { config } from "@pkrbt/util";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed/main.ts",
  },
  datasource: {
    url: config.database.url,
  },
});
