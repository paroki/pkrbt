import { ComponentProps } from "react";
import { Button } from "../shadcn/button";
import { LucideSave } from "lucide-react";
import { cn } from "~/common/utils";
import { useLoading, useSubmitting } from "~/hooks/ui";
import { LoaderIcon } from "~/common/config";
import { Link } from "@remix-run/react";
import { PropsWithAuth } from "../types";
import { useAuth } from "~/pkg/auth/hooks";

type Props = ComponentProps<typeof Button> &
  PropsWithAuth & {
    createUrl: string;
  };

export default function CreateButton({
  createUrl,
  role,
  policy,
  ...props
}: Props) {
  const loading = useLoading();
  const submitting = useSubmitting();
  const { ensureGranted } = useAuth();
  const granted = ensureGranted(role, policy);
  if (!granted) {
    return null;
  }

  return (
    <Button
      {...props}
      type="submit"
      disabled={submitting || loading}
      className={cn(
        "bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-500/90",
      )}
      asChild
      size={"sm"}
    >
      <Link to={createUrl}>
        {submitting ? <LoaderIcon className="animate-spin" /> : <LucideSave />}
        Tambah
      </Link>
    </Button>
  );
}
