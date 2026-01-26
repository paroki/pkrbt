"use server";
import { auth } from "@pkrbt/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function google() {
  const { url } = await auth.api.signInSocial({
    body: {
      callbackURL: "http://localhost:3000",
      provider: "google",
    },
    headers: await headers(),
  });
  if (url) {
    redirect(url);
  }
}
