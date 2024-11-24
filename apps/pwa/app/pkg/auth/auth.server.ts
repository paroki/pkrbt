import { getAuthenticatedUser } from "~/services/auth.server";
import { hasPolicy, isGranted } from "./utils";
import { UserPolicyType, UserRole } from "./types";
import { redirect } from "@remix-pwa/sw";

export async function ensureRequestGranted(request: Request, role: UserRole) {
  const user = await getAuthenticatedUser(request);
  if (!isGranted(user.role, role)) {
    throw redirect("/forbidden", {
      status: 403,
      statusText: "Forbidden",
    });
  }
}

export async function ensureUserPolicy(
  request: Request,
  policy: UserPolicyType,
) {
  const user = await getAuthenticatedUser(request);
  if (!hasPolicy(user.policies, policy)) {
    throw redirect("/forbidden", {
      status: 403,
      statusText: "Forbidden",
    });
  }
}
