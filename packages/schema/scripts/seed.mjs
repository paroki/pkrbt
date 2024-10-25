import { createPosts } from "./sample/post.mjs";
import { importImages } from "./sample/image.mjs";
import { createPages } from "./sample/page.mjs";
import { ensureCategories, getCategories } from "./reference/category.mjs";

async function main() {
  await importImages();
  await ensureCategories();
  await createPages();
  //await createPosts();
}

await main();
