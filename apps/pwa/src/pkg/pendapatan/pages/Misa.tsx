import { Button } from "@pkrbt/ui/shadcn/button";
import { PlusCircleIcon } from "lucide-react";
import Misa from "../components/Misa";

export default function MisaPage({}) {
  return (
    <div className="flex flex-col gap-y-4 mt-8">
      <div className="flex flex-row gap-4">
        <h3 className="text-xl content-center font-bold">Misa</h3>
        <Button>
          <PlusCircleIcon />
        </Button>
      </div>
      <Misa />
    </div>
  );
}
