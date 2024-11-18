import { toast } from "~/hooks/shadcn/use-toast";
import { cn } from "./utils";

const successStyle = cn(
  "flex fixed top-[48px] right-4 bg-green-50 border-green-400 w-auto",
  "font-semibold text-green-900",
);

export function toastUpdated(description = "perubahan data berhasil disimpan") {
  toast({
    description,
    className: successStyle,
  });
}

export function toastCreated(description = "data baru berhasil disimpan") {
  toast({
    description,
    className: successStyle,
  });
}

export function toastRemoved(description = "data berhasil dihapus") {
  toast({
    description,
    className: successStyle,
  });
}
