"use server";

import { signOut } from "@/common/auth";
import { DIRECTUS_TOKEN_NAME } from "@/common/config";
import { createDirectus } from "@/common/directus";
import { DirectusUser } from "@directus/sdk";
import { User } from "next-auth";
import { cookies } from "next/headers";
import { UserR } from "./types";

export type UserPayload = Partial<User>;

export async function updateProfile(id: string, payload: UserPayload) {
  const directus = await createDirectus();
  const { item } = await directus.user.update(id, payload as DirectusUser);

  return item as unknown as UserR;
}

export async function userSignOut() {
  const cookie = await cookies();
  cookie.delete(DIRECTUS_TOKEN_NAME);
  await signOut();
}
