import { SumberPendapatan } from "@pkrbt/directus";

export type SumberPendapatanR = Omit<SumberPendapatan, "id"> & {
  id: string;
};
