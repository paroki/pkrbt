import dotenv from "dotenv";
import { existsSync, readFileSync, readSync, writeFileSync } from "fs";
import openapiTS from "openapi-typescript";
import invariant from "tiny-invariant";

dotenv.config();
invariant(process.env.DIRECTUS_TOKEN);
invariant(process.env.DIRECTUS_ENDPOINT);

const TOKEN = process.env.DIRECTUS_TOKEN;
const OAS = `${process.env.DIRECTUS_ENDPOINT}/server/specs/oas`;
const SCHEMA_FILE = "./scripts/downloads/openapi.json";

async function downloadSchema() {
  const data = await fetch(OAS, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  const json = await data.json();
  writeFileSync(SCHEMA_FILE, JSON.stringify(json, undefined, 2));
}
async function main() {
  await downloadSchema();
}

main();
