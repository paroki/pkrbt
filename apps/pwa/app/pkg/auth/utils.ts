import {
  UserPoliciesMap,
  UserPolicy,
  UserPolicyType,
  UserRole,
  UserRoles,
} from "./types";

export function isGranted(userRole: UserRole, expectedRole: UserRole) {
  return UserRoles[userRole] >= UserRoles[expectedRole];
}

export function isAdmin(userRole: UserRole) {
  return isGranted(userRole, "admin");
}

export function isOrganisator(role: UserRole) {
  return isGranted(role, "organisator");
}

export function hasPolicy(
  policies: UserPolicy[],
  expectedPolicy: UserPolicyType,
) {
  const policy = UserPoliciesMap[expectedPolicy];
  return policies.includes(policy);
}
