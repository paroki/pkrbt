import { directus } from "@/utils/directus";

export async function fetchHomepage() {
  const { item, error } = await directus.page.readBySlug("beranda");

  if (error) {
    Promise.reject(error.cause);
  }
  return item;
}
