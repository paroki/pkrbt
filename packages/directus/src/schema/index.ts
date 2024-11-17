export * from "./openapi";
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
  OrganisasiUser,
} from "..";
import { JenisKegiatan, Kegiatan } from "../kegiatan/types";

export type Schema = {
  page: Page[];
  category: Category[];
  post: Post[];
  organisasi: Organisasi[];
  organisasi_struktur: StrukturOrganisasi[];
  organisasi_jabatan: JabatanOrganisasi[];
  organisasi_jabatan_periode: PeriodeJabatan[];
  organisasi_anggota: AnggotaOrganisasi[];
  directus_user: User[];
  user: User[];
  user_organisasi: OrganisasiUser[];
  imam: Imam[];
  // paroki
  sumber_pendapatan: SumberPendapatan[];
  pendapatan: Pendapatan[];
  misa: Misa[];

  // kegiatan
  jenis_kegiatan: JenisKegiatan[];
  kegiatan: Kegiatan[];
};
