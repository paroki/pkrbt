import { components, ImageType } from "..";

type schema = components["schemas"];

export type OrganisasiUser = schema["ItemsOrganisasiUser"];

export type User = Omit<schema["Users"], "avatar" | "user" | "role"> & {
  avatar?: ImageType;
};
