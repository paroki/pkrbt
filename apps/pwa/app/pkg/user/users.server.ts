/* eslint-disable no-async-promise-executor */
import { zodResolver } from "@hookform/resolvers/zod";
import { getValidatedFormData } from "remix-hook-form";
import { BiodataFormSchema } from "./components/BiodataForm";
import { z } from "zod";
import { getAuthenticatedUser } from "~/services/auth.server";
import { json } from "@remix-pwa/sw";
import createDirectus, { sdkCreateClient } from "~/services/directus.server";
import { OrganisasiUser, UserP, UserR } from "@pkrbt/directus";
import { readUsers } from "@directus/sdk";

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
      // @ts-expect-error 2353
      { organisasi: [{ organisasi: ["id"] }] },
      { avatar: ["id", "title"] },
    ],
  });

  if (!item) {
    throw error;
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
  } as UserP;

  await directus.user.update(user.id, payload);

  return json(data);
}

export async function getPolicies() {}

export async function listUsers(request: Request) {
  const directus = await sdkCreateClient(request);
  const user = await getAuthenticatedUser(request);
  const { searchParams } = new URL(request.url);
  const page = searchParams.has("page") ? Number(searchParams.get("page")) : 1;

  let items = undefined;
  try {
    items = (await directus.request(
      readUsers({
        fields: [
          "id",
          // @ts-expect-error 2322
          "nama",
          "avatar",
          "first_name",
          "last_name",
          {
            role: ["id", "name"],
          },
          {
            policies: [
              "id",
              {
                // @ts-expect-error 2353
                policy: ["id", "name"],
              },
            ],
          },
        ],
        limit: 5,
        page,
        sort: [
          // @ts-expect-error 2353
          "nama",
          "-first_name",
          "-last_name",
        ],
        filter: {
          id: {
            _neq: user.id,
          },
        },
      }),
    )) as unknown as UserR[];
  } catch (e) {
    throw e as Error;
  }

  return items ? items : [];
}
