import { createPosts } from "./sample/post.mjs";
import { importImages } from "./sample/image.mjs";
import { createPages } from "./sample/page.mjs";
import { ensureCategories } from "./reference/category.mjs";
import { ensureDPP } from "./reference/dpp.mjs";
import { createPenjabat } from "./sample/penjabat.mjs";
import { exit } from "process";

async function main() {
  await importImages();
  await ensureCategories();
  await createPages();
  await createPosts();
  await ensureDPP();
  await createPenjabat();

  console.warn("seeding completed");
  exit(0);
}

await main();
