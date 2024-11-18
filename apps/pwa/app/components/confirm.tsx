import { LoaderCircleIcon, LucideTrash, XIcon } from "lucide-react";
import { PropsWithChildren } from "react";
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "~/components/shadcn/alert-dialog";
import { Button } from "./shadcn/button";

type Props = PropsWithChildren & {
  title: string;
  description?: string;
  onDelete: () => void;
  loading: boolean;
};

export default function ConfirmDialog({
  title,
  description,
  children,
  onDelete,
  loading,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} disabled={loading}>
          {loading ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            <LucideTrash />
          )}
          Hapus
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
        {children}
        <AlertDialogFooter className="flex flex-row gap-x-2">
          <AlertDialogCancel>
            <XIcon />
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={onDelete}
          >
            <LucideTrash />
            Ya, Hapus Data!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
