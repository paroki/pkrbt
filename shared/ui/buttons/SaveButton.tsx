import { LoaderCircle, Save } from "lucide-react";
import { Button } from "~/components/ui/button";

export function SaveButton({
  form,
  loading = false,
  disabled = false,
}: {
  form: string;
  loading: boolean;
  disabled: boolean;
}) {
  return (
    <Button
      type="submit"
      size={"sm"}
      form={form}
      disabled={loading || disabled}
      className="bg-green-600 hover:bg-green-800 disabled:bg-green-500"
    >
      {loading ? <LoaderCircle className="animate-spin" /> : <Save />}
      Simpan
    </Button>
  );
}
