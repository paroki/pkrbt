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

export async function getUserPolicies() {
  const session = await auth();

  if (!session?.userPolicies) {
    redirect("/login");
  }

  return session.userPolicies;
}

export async function getPolicies() {
  const session = await auth();

  if (!session?.policies) {
    redirect("/login");
  }

  return session.policies;
}

async function isGranted(policyId: string) {
  const userPolicies = await getUserPolicies();
  return userPolicies.includes(policyId);
}

export async function ensurePengurusHarianDPP() {
  const policies = await getPolicies();
  // const isAdmin = await isGranted(policies.Administrator);
  const granted = await isGranted(policies.PengurusHarianDPP);

  if (!granted) {
    redirect("/forbidden");
  }
}
