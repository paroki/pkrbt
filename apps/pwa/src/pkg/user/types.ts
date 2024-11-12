import { OrganisasiR, User } from "@pkrbt/directus";
import { FileWithPath } from "react-dropzone";

export type FileWithPreview = FileWithPath & {
  preview: string;
};

/**
 * User response type
 */
export type UserR = User &
  Omit<User, "id" | "email" | "organisasi" | "user" | "avatar"> &
  Pick<Required<User>, "id" | "email" | "avatar"> & {
    organisasi: {
      id?: number | undefined;
      organisasi?: OrganisasiR;
    }[];
  };
