import { Button } from "@pkrbt/ui/shadcn/button";
import { listHarian } from "../actions";
import PendapatanTable from "../components/PendapatanTable";
import { PlusCircleIcon } from "lucide-react";

export default async function HarianPage() {
  const items = await listHarian();

  return (
    <div className="flex flex-col gap-y-4 mt-8">
      <div className="flex flex-row gap-4 align-middle">
        <h3 className="text-xl content-center font-bold">Harian</h3>
        <Button>
          <PlusCircleIcon />
        </Button>
      </div>
      <PendapatanTable items={items} />
    </div>
  );
}
