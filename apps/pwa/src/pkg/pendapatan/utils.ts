import { PendapatanR } from "@pkrbt/directus";

export function sumPendapatan(pendapatan: PendapatanR[]) {
  let total = 0;
  pendapatan.map((item) => {
    if (item.jumlah) {
      total += item.jumlah;
    }
  });

  return total;
}
