import {
  components,
  ImageType,
  LingkunganR,
  Organisasi,
  OrganisasiR,
  WilayahR,
} from "..";

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

export type UserRoleR = Omit<UserRole, "id" | "name"> &
  Pick<Required<UserRole>, "id" | "name">;

export type UserPolicy = {
  id: string;
  policy: {
    id: string;
    name: string;
  };
};

export type User = Omit<
  schema["Users"],
  | "avatar"
  | "foto"
  | "role"
  | "tanggalLahir"
  | "policies"
  | "organisasi"
  | "wilayah"
  | "lingkungan"
> & {
  avatar?: ImageType;
  foto?: ImageType;
  role?: UserRole;
  tanggalLahir?: string;
  organisasi?: Partial<OrganisasiUser>[];
  policies: UserPolicy[];
  wilayah?: WilayahR;
  lingkungan?: LingkunganR;
};

export type UserR = Omit<User, "id" | "organisasi"> &
  Pick<Required<User>, "id"> & {
    organisasi?: OrganisasiUserR[];
  };

export type UserP = Omit<
  Partial<User>,
  "foto" | "avatar" | "wilayah" | "lingkungan"
> & {
  avatar: string;
  foto: string;
  wilayah: string;
  lingkungan: string;
};
