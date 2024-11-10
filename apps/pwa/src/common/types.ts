import { DirectusUser } from "@directus/sdk";

export type UserR = Omit<DirectusUser, "id" | "email"> &
  Pick<Required<DirectusUser>, "id" | "email">;

export type MenuItem = {
  name: string;
  path: string;
  children?: MenuItem[];
};

export type UserPolicy = {
  id: string;
  policy: string;
};

export type Policies = {
  Administrator: string;
  Author: string;
  PengurusHarianDPP: string;
};
