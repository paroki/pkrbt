"use server";

import { signOut } from "@/common/auth";
import { DIRECTUS_TOKEN_NAME } from "@/common/config";
import { createDirectus } from "@/common/directus";
import { deleteFile, uploadFiles } from "@directus/sdk";
import { cookies } from "next/headers";
import { UserR } from "./types";
import { revalidatePath } from "next/cache";
import { ImageType, User } from "@pkrbt/directus";

export type UserPayload = Partial<User>;

function revalidateProfile(userId: string) {
  revalidatePath(`/user/${userId}/profile`);
}

export async function updateProfile(id: string, payload: UserPayload) {
  const directus = await createDirectus();
  const { item } = await directus.user.update(id, payload);

  revalidateProfile(id);
  return item as unknown as UserR;
}

export async function userSignOut() {
  const cookie = await cookies();
  cookie.delete(DIRECTUS_TOKEN_NAME);
  await signOut();
}

/**
 * Update foto profil payload
 */
export type UpdateFotoP = {
  formData: FormData;
  currentFotoId?: string;
  userId: string;
};

export async function updateFoto({
  formData,
  currentFotoId,
  userId,
}: UpdateFotoP) {
  const directus = await createDirectus();

  if (currentFotoId) {
    await directus.rest.request(deleteFile(currentFotoId));
  }

  const result = (await directus.rest.request(
    uploadFiles(formData),
  )) as ImageType;

  await directus.user.update(userId, {
    foto: result,
  });

  revalidateProfile(userId);
  return result as ImageType;
}

/**
 * Update Avatar Payload
 */
export type UpdateAvatarP = {
  formData: FormData;
  currentAvatarId?: string;
  userId: string;
};

export async function updateAvatar({
  formData,
  userId,
  currentAvatarId,
}: UpdateAvatarP) {
  const directus = await createDirectus();

  if (currentAvatarId) {
    await directus.rest.request(deleteFile(currentAvatarId));
  }

  const result = (await directus.rest.request(
    uploadFiles(formData),
  )) as unknown as ImageType;

  await directus.user.update(userId, {
    avatar: result,
  });

  revalidateProfile(userId);

  return result as ImageType;
}

export async function getUserProfile(id: string) {
  const directus = await createDirectus();
  const { item } = await directus.user.read(id, {
    fields: [
      "id",
      "nama",
      "tempatLahir",
      "tanggalLahir",
      "first_name",
      "last_name",
      {
        organisasi: [
          "id",
          {
            organisasi: ["id"],
          },
          "persetujuan",
        ],
      },
      {
        avatar: ["id", "title", "width", "height"],
      },
      {
        foto: ["id", "title", "width", "height"],
      },
    ],
  });

  return item as unknown as UserR;
}
