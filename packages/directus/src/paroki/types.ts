import { components, ImageType } from "../schema";

type schema = components["schemas"];

export type RiwayatImam = schema["ItemsImamRiwayat"];
export type Imam = Omit<schema["ItemsImam"], "foto" | "riwayat"> & {
  foto?: ImageType;
  riwayat?: RiwayatImam[] | null;
};
