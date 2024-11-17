import { Query } from "@directus/sdk";
import { Misa, PendapatanR, Schema } from "@pkrbt/directus";
import { Params } from "@remix-run/react";
import invariant from "tiny-invariant";
import createDirectus, { DirectusError } from "~/services/directus.server";
import { Intent, PendapatanFormSchema } from "./components/PendapatanForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { getValidatedFormData } from "remix-hook-form";
import { json } from "@remix-pwa/sw";
import { z } from "zod";

const misaDefaultFields = {
  fields: [
    "id",
    "tanggal",
    "perayaan",
    {
      pendapatan: [
        "id",
        "tanggal",
        "uraian",
        "jumlah",
        "catatan",
        { sumber: ["id", "sort", "sumber"] },
      ],
    },
  ],
  sort: ["-tanggal"],
} satisfies Query<Schema, Misa>;

export async function sumberPendapatanList(request: Request) {
  const directus = await createDirectus(request);
  const { items, error } = await directus.sumberPendapatan.search({
    fields: ["id", "sort", "sumber"],
    sort: "sort",
  });

  if (error) {
    throw new DirectusError(error.message, { cause: error });
  }

  if (!items) {
    throw new Error("Sumber Pendapatan not found, or unconfigured!");
  }

  return items;
}

export async function listByMisa(request: Request, params: Params) {
  const directus = await createDirectus(request);
  const limit = params.limit ? Number(params.limit) : 6;
  const { items, error } = await directus.misa.search({
    ...misaDefaultFields,
    limit,
  });

  if (error) {
    throw new DirectusError(error.message, { cause: error });
  }

  return items ? items : [];
}

export async function readMisaById(request: Request, params: Params) {
  const directus = await createDirectus(request);
  const id = params.id;
  invariant(id, "Misa ID should be defined!");

  const { items, error } = await directus.misa.search({
    ...misaDefaultFields,
    filter: {
      id: {
        _eq: id,
      },
    },
    limit: 1,
  });

  if (error) {
    throw new DirectusError(error.message, { cause: error });
  }

  return items ? items[0] : undefined;
}

export async function updatePendapatan(request: Request) {
  const resolver = zodResolver(PendapatanFormSchema);
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<
    z.infer<typeof PendapatanFormSchema> & { id: string; intent: Intent }
  >(request, resolver);

  if (errors) return json({ errors, defaultValues });

  const { id, sumber, jumlah, catatan, misa, intent, tanggal } = data;
  const directus = await createDirectus(request);
  const realValue = Number(jumlah.replace(/\./g, ""));

  if ("update" === intent) {
    const { item, error } = await directus.pendapatan.update(id, {
      sumber,
      jumlah: realValue,
      catatan,
    });
    if (error) {
      throw new DirectusError(error.message, { cause: error });
    }

    return json({ pendapatan: item as PendapatanR });
  } else if ("create" === intent) {
    const payload = {
      sumber,
      jumlah: realValue,
      catatan,
      misa: { id: misa },
      tanggal,
    };

    const { item, error } = await directus.pendapatan.create(payload);
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new DirectusError(error.message, { cause: error });
    }

    return json({ pendapatan: item as PendapatanR });
  } else if ("delete" === intent) {
    const { error } = await directus.pendapatan.remove(id);

    if (error) {
      throw new DirectusError(error.message, { cause: error });
    }

    return json({ id, sumber });
  }

  throw new Error("Unknown form action intent!");
}
