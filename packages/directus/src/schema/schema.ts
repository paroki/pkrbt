import {
  AnggotaOrganisasi,
  Category,
  JabatanOrganisasi,
  Organisasi,
  Page,
  PeriodeJabatan,
  Post,
  StrukturOrganisasi,
} from ".";

export type Schema = {
  page: Page[];
  category: Category[];
  post: Post[];
  organisasi: Organisasi[];
  organisasi_struktur: StrukturOrganisasi[];
  organisasi_jabatan: JabatanOrganisasi[];
  organisasi_jabatan_periode: PeriodeJabatan[];
  organisasi_anggota: AnggotaOrganisasi[];
};
