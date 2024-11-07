export function formatMoney(item: number | null) {
  if (null === item) {
    return "";
  }

  const idr = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return idr.format(item).replace(/Rp\s+/, "").replace(",00", "");
}
