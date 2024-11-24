import { LingkunganR, WilayahR } from "@pkrbt/directus";
import createDirectus from "~/services/directus.server";

export async function readWilayahItems(request: Request) {
  const directus = await createDirectus(request);
  const { items } = await directus.wilayah.search({
    fields: ["id", "nama"],
  });

  return items ? (items as unknown as WilayahR[]) : [];
}

export async function readLingkunganItems(request: Request) {
  const directus = await createDirectus(request);
  const { items } = await directus.lingkungan.search({
    fields: ["id", "nama"],
  });

  return items ? (items as unknown as LingkunganR[]) : [];
}
