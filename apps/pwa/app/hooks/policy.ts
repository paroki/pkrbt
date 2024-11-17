import { useOutletContext } from "@remix-run/react";
import { RootOutletContext } from "~/root";

export function useUserPolicies() {
  const { userPolicies } = useOutletContext<RootOutletContext>();

  return userPolicies;
}

export function isGranted(userPolicies: string[], requiredPolicies?: string[]) {
  if (!requiredPolicies) return true;

  for (let i = 0; i < requiredPolicies.length; i++) {
    const policy = requiredPolicies[i];
    if (userPolicies.includes(policy)) {
      return true;
    }
  }

  return false;
}
