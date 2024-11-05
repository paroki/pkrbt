export * from "../user/openapi";
export * from "./system";
import {
  AnggotaOrganisasi,
  JabatanOrganisasi,
  Organisasi,
  PeriodeJabatan,
  StrukturOrganisasi,
  Category,
  Page,
  Post,
  Imam,
  Pendapatan,
  SumberPendapatan,
  User,
  Misa,
} from "..";

export type Schema = {
  page: Page[];
  category: Category[];
  post: Post[];
  organisasi: Organisasi[];
  organisasi_struktur: StrukturOrganisasi[];
  organisasi_jabatan: JabatanOrganisasi[];
  organisasi_jabatan_periode: PeriodeJabatan[];
  organisasi_anggota: AnggotaOrganisasi[];
  user: User[];
  imam: Imam[];
  // paroki
  sumber_pendapatan: SumberPendapatan[];
  pendapatan: Pendapatan[];
  misa: Misa[];
};
