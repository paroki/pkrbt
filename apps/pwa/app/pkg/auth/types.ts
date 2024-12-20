export const UserRoles = {
  developer: 6,
  admin: 5,
  organisator: 4,
  penerbit: 3,
  penulis: 2,
  user: 1,
};

export type UserRole = keyof typeof UserRoles;

export const UserPoliciesMap = {
  PengurusHarian: "Pengurus Harian",
  Bendahara: "Bendahara",
};

export type UserPolicyType = keyof typeof UserPoliciesMap;
export type UserPolicy = (typeof UserPoliciesMap)[UserPolicyType];
