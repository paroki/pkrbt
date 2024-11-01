import { User } from "@pkrbt/directus";

/**
 * User response type
 */
export type UserR = Omit<User, "id"> & Pick<Required<User>, "id">;
