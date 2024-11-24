import { ComponentProps } from "react";
import { Button } from "../shadcn/button";
import { LucideLoaderCircle, LucideSave } from "lucide-react";
import { cn } from "~/common/utils";
import { useLoading, useSubmitting } from "~/hooks/ui";
import { PropsWithAuth } from "../types";
import { useAuth } from "~/pkg/auth/hooks";

type Props = PropsWithAuth & ComponentProps<"button">;

export default function SaveButton({ policy, role, ...props }: Props) {
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
      className={cn("bg-green-700 hover:bg-green-600 disabled:bg-green-600/90")}
      size={"sm"}
    >
      {submitting || loading ? (
        <LucideLoaderCircle className="animate-spin" />
      ) : (
        <LucideSave />
      )}
      Simpan
    </Button>
  );
}
