import fs from "fs";
import { createDirectus } from "../directus.mjs";
import { importFile, readFiles } from "@directus/sdk";

let images = [];

const directus = createDirectus();

async function importImage({ name, url }) {
  const rest = directus.rest;
  const searches = await rest.request(
    readFiles({
      search: name,
    }),
  );

  if (searches.length > 0) {
    return searches[0];
  }

  return await rest.request(
    importFile(url, {
      title: name,
      filename_disk: `${name}.jpg`,
      filename_download: `${name}.jpg`,
    }),
  );
}

export function getImages() {
  return images;
}
export async function importImages() {
  const data = JSON.parse(fs.readFileSync("./scripts/fixtures/data/data.json"));
  for (let i = 0; i < data.images.length; i++) {
    const file = await importImage(data.images[i]);

    images.push(file);
  }
}
