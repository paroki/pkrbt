import { components, ImageType } from "..";

type schema = components["schemas"];

export type OrganisasiUser = Omit<
  schema["ItemsUserOrganisasi"],
  "organisasi" | "user"
> & {
  persetujuan: boolean;
};

export type UserRole = schema["Roles"];

export type User = Omit<
  schema["Users"],
  "avatar" | "foto" | "role" | "tanggalLahir"
> & {
  avatar?: ImageType;
  foto?: ImageType;
  role?: UserRole;
  tanggalLahir?: string;
  organisasi: OrganisasiUser[];
};
