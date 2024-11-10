"use server";

import { createDirectus } from "@/common/directus";

export async function listOrganisasi() {
  const directus = await createDirectus();

  const { items } = await directus.organisasi.search({
    fields: ["id", "nama", "singkatan"],
  });

  return items;
}
