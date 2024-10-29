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
} from "..";
import { User } from "..";

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
};
