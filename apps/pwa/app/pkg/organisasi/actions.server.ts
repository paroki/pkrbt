import createDirectus from "~/services/directus.server";
import { DirectusError } from "../kegiatan/actions.server";

export async function fetchLists(request: Request) {
  const directus = await createDirectus(request);
  const { items, error } = await directus.organisasi.search({
    fields: ["id", "nama"],
    sort: ["nama"],
  });

  if (error) throw new DirectusError(error);

  return items;
}
