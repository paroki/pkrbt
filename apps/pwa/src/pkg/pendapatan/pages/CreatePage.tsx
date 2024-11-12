import { createDirectus } from "@/common/directus";
import PendapatanForm from "../components/PendapatanForm";
import { SumberPendapatanR } from "../types";
import { create } from "../actions";

export default async function CreatePendapatanPage() {
  const directus = await createDirectus();
  const { items: sumber } = await directus.sumberPendapatan.search({});
  return (
    <div>
      <PendapatanForm
        saveAction={create}
        sumberPendapatan={sumber as SumberPendapatanR[]}
      />
    </div>
  );
}
