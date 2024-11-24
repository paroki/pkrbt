import { LucideTrash2, XCircleIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../shadcn/alert-dialog";
import { Button } from "../shadcn/button";
import { PropsWithChildren } from "react";
import { useLoading } from "~/hooks/ui";
import { LoaderIcon } from "~/common/config";
import { PropsWithAuth } from "../types";
import { useAuth } from "~/pkg/auth/hooks";

type Props = PropsWithChildren &
  PropsWithAuth & {
    title?: string;
    description?: string;
    onDelete: () => void;
  };

export default function RemoveButton({
  children,
  title = "Konfirmasi",
  description = "Aksi ini tidak dapat dibatalkan",
  onDelete,
  role,
  policy,
}: Props) {
  const loading = useLoading();
  const { ensureGranted } = useAuth();
  const granted = ensureGranted(role, policy);
  if (!granted) {
    return null;
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} disabled={loading} size={"sm"}>
          {loading ? <LoaderIcon className="animate-spin" /> : <LucideTrash2 />}
          Hapus
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
        {children}
        <AlertDialogFooter className="flex flex-row gap-x-2">
          <AlertDialogCancel>
            <XCircleIcon />
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={onDelete}
          >
            <LucideTrash2 />
            Ya, Hapus Data!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
