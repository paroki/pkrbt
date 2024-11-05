import { components, ImageType } from "..";

type schema = components["schemas"];

export type OrganisasiUser = schema["ItemsUserOrganisasi"];

export type UserRole = schema["Roles"];
export type User = Omit<schema["Users"], "avatar" | "role"> & {
  avatar?: ImageType;
  role?: UserRole;
};
