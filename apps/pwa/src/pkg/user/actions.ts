"use server";

import { getSessionToken, signOut } from "@/common/auth";
import { DIRECTUS_TOKEN_NAME, DIRECTUS_URL } from "@/common/config";
import { createDirectus, rest, staticToken, updateUser } from "@directus/sdk";
import { Schema, User } from "@pkrbt/directus";
import { cookies } from "next/headers";

export type UserPayload = Omit<User, "nama" | "tempatLahir"> &
  Pick<Required<User>, "nama" | "tempatLahir">;

export async function updateProfile(id: string, payload: UserPayload) {
  console.log(payload);
  const token = await getSessionToken();
  const directus = createDirectus<Schema>(DIRECTUS_URL)
    .with(staticToken(token))
    .with(rest());
  const { nama, tempatLahir } = payload;
  const response = await directus.request(
    updateUser(id, {
      id,
      nama,
      tempatLahir,
    }),
  );

  console.log(response);
}

export async function userSignOut() {
  const cookie = await cookies();
  cookie.delete(DIRECTUS_TOKEN_NAME);
  await signOut();
}
