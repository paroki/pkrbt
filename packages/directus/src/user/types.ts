import { components, ImageType } from "..";

type schema = components["schemas"];

export type OrganisasiUser = Omit<
  schema["ItemsUserOrganisasi"],
  "organisasi" | "user"
> & {
  persetujuan: boolean;
};

export type UserRole = Omit<schema["Roles"], "policies"> & {
  policies: UserPolicy[];
};

export type UserPolicy = {
  id: string;
  name: string;
  description: string;
};

export type User = Omit<
  schema["Users"],
  "avatar" | "foto" | "role" | "tanggalLahir" | "policies"
> & {
  avatar?: ImageType;
  foto?: ImageType;
  role?: UserRole;
  tanggalLahir?: string;
  organisasi: OrganisasiUser[];
  policies: UserPolicy[];
};
