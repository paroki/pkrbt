import { redirect } from "next/navigation";
import routes from "@/pkg/pendapatan/routes";

export default async function PendapatanPage() {
  redirect(routes.harian.href);
}
