import { authentication, createDirectus } from "@directus/sdk";
import dotenv from "dotenv";
import { writeFileSync } from "fs";
import { exit } from "process";
import invariant from "tiny-invariant";

dotenv.config();
invariant(process.env.DIRECTUS_URL);

const OAS = `${process.env.DIRECTUS_URL}/server/specs/oas`;
const SCHEMA_FILE = "./scripts/downloads/openapi.json";

async function downloadSchema() {
  const directus = createDirectus(process.env.DIRECTUS_URL).with(
    authentication("json"),
  );
  const { access_token } = await directus.login(
    process.env.DIRECTUS_ADMIN_EMAIL,
    process.env.DIRECTUS_ADMIN_PASSWORD,
  );

  const data = await fetch(OAS, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const json = await data.json();
  writeFileSync(SCHEMA_FILE, JSON.stringify(json, undefined, 2));
}

async function main() {
  await downloadSchema();
  exit(0);
}

await main();
