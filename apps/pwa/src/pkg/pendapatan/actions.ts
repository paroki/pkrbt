"use server";
import { createDirectus } from "@/common/directus";
import { MisaR, PendapatanR } from "@pkrbt/directus";
import { PendapatanP, SumberPendapatanR } from "./types";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/common/user";

export async function listHarian() {
  const directus = await createDirectus();
  const { items } = await directus.pendapatan.search({
    sort: ["-tanggal"],
    limit: 5,
    fields: [
      "*",
      {
        sumber: ["id", "sumber"],
      },
    ],
  });

  return items as PendapatanR[];
}

export async function listMisa() {
  const directus = await createDirectus();
  const { items } = await directus.misa.search({
    sort: ["-tanggal"],
    fields: ["id", "tanggal", "perayaan"],
    limit: 5,
  });

  return items;
}

export async function listSumberPendapatan() {
  const directus = await createDirectus();
  const { items } = await directus.sumberPendapatan.search({});

  if (!items) {
    throw new Error("Sumber pendapatan belum di setting.");
  }

  return items as SumberPendapatanR[];
}

export async function pendapatanByTanggal(tanggal: string) {
  const directus = await createDirectus();
  const { items } = await directus.pendapatan.search({
    filter: {
      tanggal: {
        _eq: tanggal,
      },
    },
    fields: [
      "*",
      {
        sumber: ["sumber"],
      },
    ],
  });

  return items;
}

export async function misaById(id: string) {
  const directus = await createDirectus();
  const { items } = await directus.misa.search({
    filter: {
      id: {
        _eq: id,
      },
    },
  });

  return items ? (items[0] as MisaR) : undefined;
}

export async function pendapatanById(id: string) {
  const directus = await createDirectus();
  const { items } = await directus.pendapatan.search({
    fields: [
      "id",
      "tanggal",
      "uraian",
      {
        sumber: ["id", "sort", "sumber"],
      },
      "jumlah",
      "catatan",
      "updatedBy",
    ],
    filter: {
      id: {
        _eq: id,
      },
    },
    sort: ["sumber"],
  });

  return items ? (items[0] as PendapatanR) : undefined;
}

export async function update(payload: PendapatanP) {
  const directus = await createDirectus();

  const { item } = await directus.pendapatan.update(
    payload.id as string,
    payload,
  );

  revalidatePath(`/paroki/pendapatan/${payload.id}`);
  return item as PendapatanR;
}

export async function create(payload: PendapatanP) {
  const directus = await createDirectus();

  const { item } = await directus.pendapatan.create(payload);

  return item as PendapatanR;
}

export async function authorizePengurusHarian() {
  const user = await getCurrentUser();
  console.log(user);
}
