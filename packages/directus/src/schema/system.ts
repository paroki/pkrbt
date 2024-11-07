import { components } from "../user/openapi";

export type File = components["schemas"]["Files"];

export type ImageType = Omit<
  File,
  "id" | "title" | "description" | "height" | "width"
> &
  Pick<Required<File>, "id" | "title" | "description"> & {
    width: number;
    height: number;
  };
