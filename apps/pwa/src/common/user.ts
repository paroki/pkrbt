"use server";
import { Schema, User } from "@pkrbt/directus";
import { redirect } from "next/navigation";
import { auth } from "@/common/auth";
import { DirectusRole } from "@directus/sdk";
export type LoggedInUser = User & {
  role: DirectusRole<Schema>;
};

export async function getCurrentUser(): Promise<LoggedInUser> {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  return session.user as LoggedInUser;
}
