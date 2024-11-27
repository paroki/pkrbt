import { getValidatedFormData } from "remix-hook-form";
import createDirectus from "~/services/directus.server";
import { WilayahResolver, WilayahSchema } from "./components/WilayahForm";
import { json, redirect } from "@remix-pwa/sw";
import { z } from "zod";

export async function createWilayah(request: Request) {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<z.infer<typeof WilayahSchema>>(
    request,
    WilayahResolver,
  );
  if (errors) return json({ errors, defaultValues });

  const directus = await createDirectus(request);
  await directus.wilayah.create(data);

  return redirect("/referensi/wilayah");
}

export async function readWilayah(request: Request, id: string) {
  const directus = await createDirectus(request);
  const { item } = await directus.wilayah.read(id, {
    fields: ["id", "nama", "gereja", "lokasiGereja"],
  });

  return item;
}

export async function updateWilayah(request: Request, id: string) {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<z.infer<typeof WilayahSchema>>(
    request,
    WilayahResolver,
  );
  if (errors) return json({ errors, defaultValues });

  const directus = await createDirectus(request);

  await directus.wilayah.update(id, data);

  return redirect("/referensi/wilayah");
}

export async function deleteWilayah(request: Request, id: string) {
  const directus = await createDirectus(request);
  await directus.wilayah.remove(id);

  return redirect("/referensi/wilayah");
}
