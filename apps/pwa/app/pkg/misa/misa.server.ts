import { z } from "zod";
import { MisaSchema } from "./components/MisaForm";
import createDirectus, { DirectusError } from "~/services/directus.server";
import { MisaR } from "@pkrbt/directus";

export async function fetchMisaById(request: Request, id: string) {
  const directus = await createDirectus(request);
  const { items, error } = await directus.misa.search({
    filter: {
      id: {
        _eq: id,
      },
    },
  });

  if (error) {
    throw error;
  }

  if (!items || items.length < 1) {
    throw new Response("Misa tidak ditemukan", {
      status: 404,
      statusText: "Misa tidak ditemukan",
    });
  }

  return items[0];
}

export async function createMisa(
  request: Request,
  data: z.infer<typeof MisaSchema>,
) {
  const directus = await createDirectus(request);
  const { tanggal, perayaan } = data;
  const { item, error } = await directus.misa.create({ tanggal, perayaan });

  if (error) {
    throw new DirectusError(error.message, { cause: error });
  }

  return item as MisaR;
}

export async function deleteMisa(request: Request, id: string) {
  const directus = await createDirectus(request);
  const { error } = await directus.misa.remove(id);

  if (error) {
    throw error;
  }
}
