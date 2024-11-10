import { listSumberPendapatan, pendapatanById, update } from "../actions";
import PendapatanForm from "../components/PendapatanForm";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditPage({ params }: Props) {
  const pendapatan = await pendapatanById(params.id);
  const sumber = await listSumberPendapatan();
  return (
    <div>
      <h3 className="text-xl font-bold">Edit Pendapatan</h3>
      <PendapatanForm
        pendapatan={pendapatan}
        sumberPendapatan={sumber}
        saveAction={update}
      />
    </div>
  );
}
