import { useRootOutletContext } from "~/hooks/outlets";
import { UserPolicyType, UserRole } from "./types";
import * as auth from "./utils";

export function useAuth() {
  const { user } = useRootOutletContext();
  function isGranted(role: UserRole) {
    return auth.isGranted(user.role, role);
  }

  function isAdmin() {
    return auth.isAdmin(user.role);
  }

  function hasPolicy(policy: UserPolicyType | UserPolicyType[]) {
    let granted = true;
    const pols: UserPolicyType[] =
      typeof policy === "string" ? [policy] : policy;

    pols.map((item) => {
      if (!auth.hasPolicy(user.policies, item)) {
        granted = false;
      }
    });

    return granted;
  }

  function ensureGranted(
    role?: UserRole,
    policy?: UserPolicyType | UserPolicyType[],
  ) {
    let granted = true;
    if (role && !isGranted(role)) {
      granted = false;
    }
    if (policy && !hasPolicy(policy)) {
      granted = false;
    }

    return granted;
  }
  return {
    isAdmin,
    isGranted,
    hasPolicy,
    ensureGranted,
  };
}
