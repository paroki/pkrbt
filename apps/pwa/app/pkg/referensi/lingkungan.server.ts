import { json } from "@remix-pwa/sw";
import { getValidatedFormData } from "remix-hook-form";
import { z } from "zod";
import createDirectus from "~/services/directus.server";
import {
  LingkunganResolver,
  LingkunganSchema,
} from "./components/LingkunganForm";
import { redirect } from "@remix-run/react";

export async function createLingkungan(request: Request) {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<z.infer<typeof LingkunganSchema>>(
    request,
    LingkunganResolver,
  );

  if (errors) return json({ errors, defaultValues });

  const directus = await createDirectus(request);
  await directus.lingkungan.create(data);

  return redirect("/referensi/lingkungan");
}

export async function readLingkungan(request: Request, id: string) {
  const directus = await createDirectus(request);
  const { item } = await directus.lingkungan.read(id, {
    fields: ["id", "nama", { wilayah: ["id", "nama"] }],
  });
  return json(item);
}

export async function updateLingkungan(request: Request, id: string) {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<z.infer<typeof LingkunganSchema>>(
    request,
    LingkunganResolver,
  );

  if (errors) return json({ errors, defaultValues });

  const directus = await createDirectus(request);

  await directus.lingkungan.update(id, data);
  return redirect("/referensi/lingkungan");
}

export async function deleteLingkungan(request: Request, id: string) {
  const directus = await createDirectus(request);
  await directus.lingkungan.remove(id);

  return redirect("/referensi/lingkungan");
}
