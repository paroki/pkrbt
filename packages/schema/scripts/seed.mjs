import { createPosts } from "./fixtures/post.mjs";
import { importImages } from "./fixtures/image.mjs";
import { createPages } from "./fixtures/page.mjs";

async function main() {
  await importImages();
  await createPages();
  await createPosts();
}

await main();
