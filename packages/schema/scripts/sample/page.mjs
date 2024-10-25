import { faker } from "@faker-js/faker";
import { createDirectus } from "../directus.mjs";
import {
  createContent,
  createTitle,
  extractSummary,
  getImage,
} from "./generator.mjs";
import { ensureError } from "../util.mjs";

const directus = createDirectus();

async function createHome() {
  const { id, error: findError } = await directus.page.readBySlug("beranda");

  ensureError(findError);
  console.log(id);
  if (id) {
    const { error } = await directus.page.remove(id);
    ensureError(error);
  }

  const content = createContent();
  const { item: page, error } = await directus.page.create({
    title: "Beranda",
    cover: getImage().id,
    summary: extractSummary(content),
    blocks: [
      {
        collection: "block_hero",
        item: {
          title: createTitle(),
          subtitle: createTitle(),
          content: faker.lorem.paragraph(8),
          images: [
            { image: getImage().id },
            { image: getImage().id },
            { image: getImage().id },
          ],
        },
      },
      {
        collection: "block_markdown",
        item: {
          body: content,
        },
      },
    ],
  });
  ensureError(error);
}
export async function createPages() {
  await createHome();
}
