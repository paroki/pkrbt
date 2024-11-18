import { ComponentProps } from "react";
import { Button } from "../shadcn/button";
import { useLoading, useSubmitting } from "~/hooks/loading";
import { LucideLoaderCircle, LucideSave } from "lucide-react";
import { cn } from "~/common/utils";

type Props = ComponentProps<"button">;

export default function SaveButton({ ...props }: Props) {
  const loading = useLoading();
  const submitting = useSubmitting();

  return (
    <Button
      {...props}
      type="submit"
      disabled={submitting || loading}
      className={cn("bg-green-700 hover:bg-green-600 disabled:bg-green-600/90")}
    >
      {submitting ? (
        <LucideLoaderCircle className="animate-spin" />
      ) : (
        <LucideSave />
      )}
      Simpan
    </Button>
  );
}
