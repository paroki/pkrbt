import { createDirectus } from "../directus.mjs";
import {
  createParagraphs,
  createTitle,
  extractSummary,
  generateCategory,
  getImage,
  typhographyContent,
} from "./generator.mjs";
import moment from "moment";

const directus = createDirectus();

async function cleanupPosts() {
  const { items, error } = await directus.post.search({ limit: 50, page: 1 });
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    const { error } = await directus.post.remove(item.id);
    if (error) {
      console.error(error);
    }
  }
}

async function createPost() {
  const title = createTitle();
  const content = `
### ${createTitle()}

${createParagraphs()},

### ${createTitle()}

${createParagraphs()}`;

  const cover = getImage().id;
  moment().t;
  const { item, error } = await directus.post.create({
    title,
    summary: extractSummary(content),
    cover,
    images: [
      { image: getImage().id },
      { image: getImage().id },
      { image: getImage().id },
    ],
    category: generateCategory().id,
    status: "published",
    publishedAt: moment(Date.now()).utcOffset("+8").toISOString(),
    blocks: [
      {
        collection: "block_markdown",
        item: {
          body: content.trim(),
        },
      },
    ],
  });

  if (error) {
    console.error(error);
  } else {
    console.log("added", item.title);
  }
}

async function createTypography() {
  const title = "Typhography Testing";
  const content = typhographyContent();
  const { error } = await directus.post.create({
    title,
    summary: extractSummary(content),
    cover: getImage().id,
    images: [
      { image: getImage().id },
      { image: getImage().id },
      { image: getImage().id },
    ],
    status: "published",
    publishedAt: new Date(),
    category: generateCategory().id,
    blocks: [
      {
        collection: "block_markdown",
        item: {
          body: content.trim(),
        },
      },
    ],
  });

  if (error) {
    console.error(error);
  }
}

export async function createPosts() {
  await cleanupPosts();

  for (let i = 0; i < 33; i++) {
    await createPost();
  }

  await createTypography();
}
