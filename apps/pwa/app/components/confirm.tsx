import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { LucideTrash, XIcon } from "lucide-react";
import { PropsWithChildren } from "react";
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogAction,
} from "~/components/shadcn/alert-dialog";
import { Button } from "./shadcn/button";
import { Link } from "@remix-run/react";

type Props = PropsWithChildren & {
  title: string;
  description: string;
  confirmLink: string;
  intent: "delete";
};

export default function ConfirmDialog({
  title,
  description,
  intent: confirmIntent,
  confirmLink,
  children,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={confirmIntent === "delete" ? "destructive" : "default"}
        >
          <LucideTrash />
          Hapus
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Button>
              <XIcon />
              Batal
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction
            asChild
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            <Link to={confirmLink}>
              <LucideTrash />
              Ya, Hapus data!
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
