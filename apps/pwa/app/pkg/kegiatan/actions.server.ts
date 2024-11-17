import { KegiatanR } from "@pkrbt/directus";
import createDirectus, { DirectusError } from "~/services/directus.server";

export async function listKegiatanByUser(
  request: Request,
): Promise<KegiatanR[]> {
  const directus = await createDirectus(request);
  const { items, error } = await directus.kegiatan.search({
    fields: [
      "id",
      "namaKegiatan",
      "tanggal",
      "dimulaiPada",
      "berakhirPada",
      { pelaksana: ["id", "nama", "singkatan"] },
      {
        jenisKegiatan: ["jenisKegiatan"],
      },
    ],
  });

  if (error) {
    throw new DirectusError(error);
  }

  return items ?? [];
}
