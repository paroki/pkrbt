import { createDirectus } from "../directus.mjs";
import { ensureError } from "../util.mjs";

const directus = await createDirectus();
const fixtures = [
  {
    title: "Berita",
    summary: "Berita",
  },
  {
    title: "Orang Kudus",
    summary: "Kisah perjalanan orang kudus",
  },
  {
    title: "Kegiatan",
    summary: "Kumpulan berita tentang kegiatan paroki",
  },
  {
    title: "Dokumentasi",
    summary: "Kumpulan foto dokumentasi kegiatan paroki",
  },
];

let categories = [];

async function ensureCategory(category) {
  const { id, error } = await directus.category.findId({
    search: category.title,
  });

  ensureError(error);

  const { title, summary } = category;

  const payload = {
    title,
    summary,
  };

  let item;
  if (id) {
    payload.id = id;
    const { item: data, error } = await directus.category.update(payload);
    item = data;
    ensureError(error);
  } else {
    const { item: data, error } = await directus.category.create(payload);
    item = data;
    ensureError(error);
  }

  return item;
}

export function getCategories() {
  return categories;
}

export async function ensureCategories() {
  for (let i = 0; i < fixtures.length; i++) {
    const category = await ensureCategory(fixtures[i]);
    categories.push(category);
  }
  console.warn("imported categories");
}
