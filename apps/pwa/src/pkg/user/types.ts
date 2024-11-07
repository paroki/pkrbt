import { DirectusUser } from "@directus/sdk";
import { Schema, User } from "@pkrbt/directus";

/**
 * User response type
 */
export type UserR = DirectusUser<Schema> &
  Omit<User, "id" | "email"> &
  Pick<Required<User>, "id" | "email">;
