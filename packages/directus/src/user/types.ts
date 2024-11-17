import { components, ImageType, Organisasi, OrganisasiR } from "..";

type schema = components["schemas"];

export type OrganisasiUser = Omit<
  schema["ItemsUserOrganisasi"],
  "persetujuan" | "organisasi"
> & {
  persetujuan: boolean;
  organisasi?: Partial<Organisasi>;
};

/**
 * Organisasi User Response with required values
 */
export type OrganisasiUserR = Omit<OrganisasiUser, "organisasi"> & {
  organisasi: OrganisasiR;
};

export type UserRole = Omit<schema["Roles"], "policies" | "users"> & {
  policies: UserPolicy[];
};

export type UserPolicy = {
  id: string;
  policy: {
    id: string;
    name: string;
  };
};

export type User = Omit<
  schema["Users"],
  "avatar" | "foto" | "role" | "tanggalLahir" | "policies" | "organisasi"
> & {
  avatar?: ImageType;
  foto?: ImageType;
  role?: UserRole;
  tanggalLahir?: string;
  organisasi?: Partial<OrganisasiUser>[];
  policies: UserPolicy[];
};

export type UserR = Omit<User, "id" | "organisasi"> &
  Pick<Required<User>, "id"> & {
    organisasi?: OrganisasiUserR[];
  };

export type UserP = Omit<Partial<User>, "foto" | "avatar"> & {
  avatar: string;
  foto: string;
};
