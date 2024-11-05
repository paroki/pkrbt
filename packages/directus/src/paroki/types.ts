import { components, ImageType } from "../schema";

type schema = components["schemas"];

export type RiwayatImam = schema["ItemsImamRiwayat"];
export type Imam = Omit<schema["ItemsImam"], "foto" | "riwayat"> & {
  foto?: ImageType;
  riwayat?: RiwayatImam[] | null;
};

export type Misa = Omit<schema["ItemsMisa"], "dokumentasi">;
export type MisaR = Required<Misa>;

export type SumberPendapatan = Omit<
  schema["ItemsSumberPendapatan"],
  "createdBy" | "updatedBy"
>;
export type Pendapatan = Omit<schema["ItemsPendapatan"], "sumber"> & {
  sumber?: SumberPendapatan;
};

/**
 * Pendapatan Response
 */
export type PendapatanR = Required<Pendapatan>;
