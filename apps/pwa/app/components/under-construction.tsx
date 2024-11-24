import { LucideHammer, SkipBackIcon } from "lucide-react";
import { cn } from "~/common/utils";
import { Button } from "./shadcn/button";
import { Link } from "@remix-run/react";

export default function UnderConstruction() {
  return (
    <div
      className={cn(
        "flex w-full min-h-[60vh] items-center justify-center content-center",
        "bg-white border rounded-lg drop-shadow-lg",
        "items-stretch p-4",
      )}
    >
      <div className="flex flex-col gap-x-4 items-center justify-center text-center">
        <LucideHammer className="w-24 h-24" />
        <h1 className="text-5xl font-extrabold">Under Construction</h1>
        <span className="mb-4">
          Layanan ini masih dalam tahap pengembangan.
        </span>
        <Button asChild variant={"default"}>
          <Link to="/">
            <SkipBackIcon />
            Kembali
          </Link>
        </Button>
      </div>
    </div>
  );
}
