import { config } from "dotenv";
import { Directus } from "../dist/index.mjs";
import { faker } from "@faker-js/faker";
import _ from "lodash";
import fs from "fs";
import { importFile, readFiles, readItems } from "@directus/sdk";
import { UniqueEnforcer } from "enforce-unique";
config();

process.env.TZ = "UTC";
const directus = new Directus({
  endpoint: process.env.DIRECTUS_ENDPOINT,
  token: process.env.DIRECTUS_TOKEN,
  clientOptions: {
    globals: {
      logger: console.log,
    },
  },
});

let images = [];
let categories = [];
const data = JSON.parse(fs.readFileSync("./scripts/fixtures/data.json"));

const uniqueTitlesEnforcer = new UniqueEnforcer();
function genTitle() {
  const title = uniqueTitlesEnforcer.enforce(
    () => faker.lorem.words({ min: 2, max: 4 }),
    { maxTime: 50, maxRetries: 50 },
  );

  return _.startCase(title);
}

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

async function importImages() {
  for (let i = 0; i < data.images.length; i++) {
    const file = await importImage(data.images[i]);

    images.push(file);
  }
}

async function createHomePage() {
  const existing = await directus.page.getBySlug("home");
  if (existing) {
    await directus.page.remove(existing.id);
  }
  const title = "Home";
  const summary = faker.lorem.paragraph();
  const block_hero = {
    title: genTitle(),
    subtitle: genTitle(),
    content: faker.lorem.sentences(),
    images: [
      {
        directus_files_id: images[0].id,
      },
      {
        directus_files_id: images[1].id,
      },
      {
        directus_files_id: images[2].id,
      },
      {
        directus_files_id: images[3].id,
      },
    ],
  };

  try {
    const response = await directus.page.create({
      title,
      slug: "home",
      blocks: [
        {
          collection: "block_hero",
          item: { ...block_hero },
        },
        {
          collection: "block_markdown",
          item: {
            body: faker.lorem.paragraphs(4),
          },
        },
      ],
      seo: {
        title,
        meta_decription: summary,
      },
    });
    console.log("created home page", response.id);
  } catch (e) {
    console.log(JSON.stringify(e, undefined, 2));
  }
}

async function createPages() {
  await createHomePage("home");
}

function genImage() {
  const index = faker.number.int({ min: 0, max: images.length - 1 });
  return images[index];
}

async function createPost() {
  const title = genTitle();
  const summary = faker.lorem.sentences();
  await directus.post.create({
    title,
    summary,
    cover: { id: genImage().id },
    status: "published",
    published_at: new Date(),
    slug: _.kebabCase(title),
    category: genCategory().id,
    seo: {
      title,
      meta_description: summary.substring(0, 253),
      og_image: {
        id: genImage().id,
      },
    },
    images: [
      { directus_files_id: genImage().id },
      { directus_files_id: genImage().id },
      { directus_files_id: genImage().id },
    ],
  });
}

async function cleanupPosts() {
  const posts = await directus.rest.request(readItems("post"));
  console.log(`cleanup ${posts.length} posts`);
  posts.map(async (item) => {
    await directus.post.remove(item);
  });
}

async function createPosts() {
  await cleanupPosts();
  for (let i = 0; i < 31; i++) {
    await createPost();
  }
  console.log("created 31 posts");
}

function genCategory() {
  const index = faker.number.int({ min: 0, max: categories.length - 1 });

  return categories[index];
}

async function createCategories() {
  const items = [
    "Uncategorized",
    "Berita",
    "Kegiatan",
    "Orang Kudus",
    "Katekese",
  ];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const s = await directus.category.search(item);
    if (s.length > 0) {
      await directus.category.remove(s[0].id);
    }

    const category = await directus.category.create({
      title: item,
      slug: _.kebabCase(item),
      cover: {
        id: genImage().id,
      },
    });
    categories.push(category);
  }
}

async function createTypography() {
  const title = "Typhography Testing";
  const summary = faker.lorem.sentences();
  await directus.post.create({
    title,
    summary,
    cover: { id: genImage().id },
    status: "published",
    published_at: new Date(),
    slug: _.kebabCase(title),
    category: genCategory().id,
    seo: {
      title,
      meta_description: summary.substring(0, 253),
      og_image: {
        id: genImage().id,
      },
    },
    images: [
      { directus_files_id: genImage().id },
      { directus_files_id: genImage().id },
      { directus_files_id: genImage().id },
    ],
  });
}

async function main() {
  await importImages();
  await createCategories();
  await createPages();
  await createPosts();
  await createTypography();
}

await main();
