import { components, ImageType } from "../schema";
import { UserR } from "../user";

type schema = components["schemas"];

export type RiwayatImam = schema["ItemsImamRiwayat"];
export type Imam = Omit<schema["ItemsImam"], "foto" | "riwayat"> & {
  foto?: ImageType;
  riwayat?: RiwayatImam[] | null;
};

export type Misa = Omit<schema["ItemsMisa"], "pendapatan"> & {
  pendapatan?: PendapatanR[];
};

export type MisaR = Required<Misa>;

export type SumberPendapatan = Omit<
  schema["ItemsSumberPendapatan"],
  "createdBy" | "updatedBy"
>;
export type SumberPendapatanR = Omit<Required<SumberPendapatan>, "sort"> & {
  sort: number;
};

export type Pendapatan = Omit<schema["ItemsPendapatan"], "sumber"> & {
  misa?: Misa;
  sumber?: SumberPendapatan;
  createdBy?: UserR;
  updatedBy?: UserR;
};

/**
 * Pendapatan Response
 */
export type PendapatanR = Omit<Required<Pendapatan>, "sumber"> & {
  sumber: SumberPendapatanR;
};
