import dotenv from "dotenv";
import { writeFileSync } from "fs";
import { exit } from "process";
import invariant from "tiny-invariant";

dotenv.config();
invariant(process.env.DIRECTUS_URL);

const OAS = `${process.env.DIRECTUS_URL}/server/specs/oas`;
const SCHEMA_FILE = "./scripts/downloads/openapi.json";

async function downloadSchema() {
  const access_token = process.env.DIRECTUS_TOKEN;

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
