import { Query } from "@directus/sdk";
import { JenisKegiatanR, Kegiatan, KegiatanR, Schema } from "@pkrbt/directus";
import { getValidatedFormData } from "remix-hook-form";
import createDirectus from "~/services/directus.server";
import {
  JenisKegiatanResolver,
  JenisKegiatanSchema,
} from "./components/JenisKegiatanForm";
import { json, redirect } from "@remix-pwa/sw";
import { z } from "zod";
import { KegiatanResolver, KegiatanSchema } from "./components/KegiatanForm";
import { KegiatanQuery } from "./types";

const kegiatanDefaultFields = [
  "id",
  {
    jenisKegiatan: ["id", "jenisKegiatan"],
  },
  "jenisPelaksana",
  { organisasi: ["id", "nama", "coverFolder"] },
  { organisasiStruktur: ["id", "nama"] },
  { wilayah: ["id", "nama"] },
  { lingkungan: ["id", "nama"] },
  { cover: ["id", "width", "height"] },
  "namaKegiatan",
  "tempat",
  "tanggal",
  "dimulaiPada",
  "berakhirPada",
  "keterangan",
  { createdBy: ["id", "nama", { avatar: ["id", "width", "height"] }] },
  "createdAt",
  "updatedAt",
] satisfies KegiatanQuery["fields"];

export async function listKegiatanByUser(
  request: Request,
): Promise<KegiatanR[]> {
  const directus = await createDirectus(request);
  const { items, error } = await directus.kegiatan.search({
    fields: kegiatanDefaultFields,
  });

  if (error) {
    throw error;
  }

  return items ?? [];
}

export async function listKegiatan(request: Request) {
  const directus = await createDirectus(request);

  const { items, error } = await directus.kegiatan.search({
    fields: kegiatanDefaultFields,
    sort: ["-tanggal"],
  });

  if (error) {
    throw error;
  }

  return items ?? [];
}

export async function readKegiatan(request: Request, id: string) {
  const directus = await createDirectus(request);
  const query = {
    fields: [...kegiatanDefaultFields],
  } satisfies Query<Schema, Kegiatan>;

  const { item, error } = await directus.kegiatan.read(id, query);

  if (error) throw error;

  return item;
}

export async function createKegiatan(request: Request) {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<z.infer<typeof KegiatanSchema>>(
    request,
    KegiatanResolver,
  );
  if (errors) return json({ errors, defaultValues });

  const directus = await createDirectus(request);
  const { item, error } = await directus.kegiatan.create(data);
  if (error) throw error;
  return redirect(`/kegiatan/${item?.id}`);
}

export async function updateKegiatan(request: Request, id: string) {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<z.infer<typeof KegiatanSchema>>(
    request,
    KegiatanResolver,
  );
  if (errors) return json({ errors, defaultValues });

  const directus = await createDirectus(request);
  const { item, error } = await directus.kegiatan.update(id, data);
  if (error) throw error;
  return json({ kegiatan: item }, 200);
}

export async function removeKegiatan(request: Request, id: string) {
  const directus = await createDirectus(request);
  await directus.kegiatan.remove(id);
  return redirect("/kegiatan");
}

export async function createJenisKegiatan(request: Request) {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<z.infer<typeof JenisKegiatanSchema>>(
    request,
    JenisKegiatanResolver,
  );
  if (errors) return json({ errors, defaultValues });

  const directus = await createDirectus(request);
  const { item, error } = await directus.jenisKegiatan.create(data);

  if (error) {
    throw error;
  }

  return json(item as JenisKegiatanR);
}
