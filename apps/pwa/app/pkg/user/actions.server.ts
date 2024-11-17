/* eslint-disable no-async-promise-executor */
import { zodResolver } from "@hookform/resolvers/zod";
import { getValidatedFormData } from "remix-hook-form";
import { BiodataFormSchema } from "./components/BiodataForm";
import { z } from "zod";
import { getAuthenticatedUser } from "~/services/auth.server";
import { json } from "@remix-run/node";
import createDirectus, { DirectusError } from "~/services/directus.server";
import { OrganisasiUser, User } from "@pkrbt/directus";

export async function getUserProfile(request: Request) {
  const user = await getAuthenticatedUser(request);
  const directus = await createDirectus(request);
  const { item, error } = await directus.user.read(user.id, {
    fields: [
      "first_name",
      "last_name",
      "nama",
      "tempatLahir",
      "tanggalLahir",
      { organisasi: [{ organisasi: ["id"] }] },
      { avatar: ["id", "title"] },
    ],
  });

  if (!item) {
    throw new DirectusError(error);
  }

  if (!item.nama) {
    item.nama = `${item.first_name} ${item.last_name}`;
  }

  return item;
}

export async function updateBiodata(request: Request) {
  const resolver = zodResolver(BiodataFormSchema);
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<z.infer<typeof BiodataFormSchema>>(
    request,
    resolver,
  );

  if (errors) return json({ errors, defaultValues });

  const user = await getAuthenticatedUser(request);
  const directus = await createDirectus(request);

  const { nama, tempatLahir, tanggalLahir, organisasi } = data;
  const userOrganisasi: OrganisasiUser[] = [];
  organisasi.map((item) => {
    userOrganisasi.push({ organisasi: { id: item }, persetujuan: false });
  });

  const payload = {
    nama,
    tempatLahir,
    tanggalLahir,
    organisasi: userOrganisasi,
  } as User;

  await directus.user.update(user.id, payload);

  return json(data);
}
