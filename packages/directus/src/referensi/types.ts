import { components } from "..";

type schema = components["schemas"];

export type Wilayah = schema["ItemsWilayah"];
export type WilayahR = Omit<Wilayah, "id" | "nama"> &
  Pick<Required<Wilayah>, "id" | "nama">;

export type Lingkungan = schema["ItemsLingkungan"];
export type LingkunganR = Omit<Lingkungan, "id" | "nama"> &
  Pick<Required<Lingkungan>, "id" | "nama">;