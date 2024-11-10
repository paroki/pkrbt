import { Pendapatan, SumberPendapatan } from "@pkrbt/directus";

export type SumberPendapatanR = Omit<SumberPendapatan, "id"> & {
  id: string;
};

/**
 * Pendapatan payload for crud operations
 */
export type PendapatanP = Omit<Partial<Pendapatan>, "sumber"> & {
  sumber: string;
};
