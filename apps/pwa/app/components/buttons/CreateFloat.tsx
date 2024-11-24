import { Link } from "@remix-run/react";
import { LucidePlus } from "lucide-react";
import { cn } from "~/common/utils";

export default function CreateFloat({ to }: { to: string }) {
  return (
    <Link
      to={to}
      className={cn(
        "flex w-10 h-10 bg-blue-900 rounded-full text-white items-center justify-center",
        "drop-shadow-md opacity-65 hover:opacity-100",
      )}
    >
      <LucidePlus style={{ width: 24, height: 24 }} />
    </Link>
  );
}
